import { ApolloProvider } from "@apollo/react-hooks";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import { render } from "react-dom";
import App from "./App";
import client from "./client";

const Context: React.FC = ({ children }) => {
  const theme = createMuiTheme();
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ApolloProvider>
  );
};

render(
  <Context>
    <App />
  </Context>,
  document.getElementById("root")
);
