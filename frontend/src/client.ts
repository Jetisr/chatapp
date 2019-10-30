/* eslint-disable no-console */
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { ApolloLink, split } from "apollo-link";
import { setContext } from "apollo-link-context";
import { onError } from "apollo-link-error";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { createUploadLink } from "apollo-upload-client";
import gql from "graphql-tag";
import {
  Resolvers,
  AllMessagesQuery,
  MessageQuery,
  MessageQueryVariables
} from "./typescript/codegen";
import { ALL_MESSAGES, MESSAGE } from "./graphql/queries";

const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }

  extend type Mutation {
    saveLogin(token: String!): String!
    logout: String!
    deleteMessageFromCache(id: ID!): String!
    editMessageInCache(id: ID!, text: String!): String!
  }
`;

const resolvers: Resolvers<{ cache: InMemoryCache }> = {
  Mutation: {
    saveLogin: (root, { token }, { cache }) => {
      localStorage.setItem("token", token);
      cache.writeData({ data: { isLoggedIn: true } });
      return "Logged in";
    },
    logout: (root, args, { cache }) => {
      localStorage.removeItem("token");
      return "Logged out";
    },
    deleteMessageFromCache: (root, args, { cache }) => {
      const messages = cache.readQuery<AllMessagesQuery>({
        query: ALL_MESSAGES
      });
      if (messages && messages.allMessages) {
        const messagesWithoutDeletedMessage = messages.allMessages.filter(
          m => m.id !== args.id
        );
        cache.writeQuery<AllMessagesQuery>({
          query: ALL_MESSAGES,
          data: { allMessages: messagesWithoutDeletedMessage }
        });

        return `Deleted message ${args.id}`;
      }

      return "Error deleting message. Cache read query returned null";
    },
    editMessageInCache: (root, args, { cache }) => {
      const messageToEdit = cache.readQuery<
        MessageQuery,
        MessageQueryVariables
      >({ query: MESSAGE, variables: { messageId: args.id } });
      if (messageToEdit && messageToEdit.message) {
        cache.writeQuery<MessageQuery, MessageQueryVariables>({
          query: MESSAGE,
          variables: { messageId: args.id },
          data: {
            message: { ...messageToEdit.message, messageText: args.text }
          }
        });
        return "Success";
      }
      return "Couldn't find message";
    }
  }
};

const cache = new InMemoryCache({
  cacheRedirects: {
    Query: {
      message: (root, args, { getCacheKey }) =>
        getCacheKey({ __typename: "Message", id: args.messageId })
    }
  }
});

const uploadLink = createUploadLink({
  uri: "http://192.168.1.231:4000/graphql"
});
const wsLink = new WebSocketLink({
  uri: "ws://192.168.1.231:4000/graphql",
  options: {
    timeout: 30000,
    reconnect: true
  }
});

const errorHandler = onError(({ graphQLErrors, networkError }): void => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const authLink = setContext((operation, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const link = ApolloLink.from([
  errorHandler,
  authLink.concat(
    split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === "OperationDefinition" &&
          definition.operation === "subscription"
        );
      },
      wsLink,
      uploadLink
    )
  )
]);

const client = new ApolloClient({ cache, link, typeDefs, resolvers });

cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem("token")
  }
});

export default client;
