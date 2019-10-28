import { CssBaseline } from "@material-ui/core";
import React from "react";
import Pages from "./pages";
import { Layout } from "./components";

const App: React.FC = () => (
  <>
    <CssBaseline />
    <Layout>
      <Pages />
    </Layout>
  </>
);

export default App;
