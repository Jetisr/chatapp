/* eslint-disable no-console */
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { setContext } from "apollo-link-context";
import { onError } from "apollo-link-error";
import { createHttpLink } from "apollo-link-http";

const cache = new InMemoryCache();
const httpLink = createHttpLink({
  uri: "http://localhost:4000/"
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
  const token = localStorage.getItem("userToken");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const link = ApolloLink.from([errorHandler, authLink.concat(httpLink)]);

const client = new ApolloClient({ cache, link });

export default client;
