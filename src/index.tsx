import { ApolloProvider } from "@apollo/react-hooks";
import React from "react";
import { render } from "react-dom";
import App from "./App";
import client from "./client";

const Context: React.FC = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);

render(
  <Context>
    <App />
  </Context>,
  document.getElementById("root")
);
