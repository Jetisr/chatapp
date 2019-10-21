import React from "react";
import { Container } from "@material-ui/core";

const Layout: React.FC = ({ children }) => (
  <Container maxWidth="sm">{children}</Container>
);

export default Layout;
