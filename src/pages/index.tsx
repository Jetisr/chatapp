import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserAuth from "./UserAuth";
import { PrivateRoute } from "../components";
import ChatRoom from "./ChatRoom";

const Pages: React.FC = () => (
  <Router>
    <Switch>
      <Route path="/auth">
        <UserAuth />
      </Route>
      <PrivateRoute path="/">
        <ChatRoom />
      </PrivateRoute>
    </Switch>
  </Router>
);

export default Pages;
