/* eslint-disable no-console */
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { ApolloLink, split } from "apollo-link";
import { setContext } from "apollo-link-context";
import { onError } from "apollo-link-error";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { createUploadLink } from "apollo-upload-client";

const cache = new InMemoryCache();

const uploadLink = createUploadLink({ uri: "http://192.168.1.231:4000" });
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

const client = new ApolloClient({ cache, link });

export default client;
