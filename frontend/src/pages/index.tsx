import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PrivateRoute, Modal } from "../components";
import ChatRoom from "./ChatRoom";
import UserAuth from "./UserAuth";

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
    <Modal />
  </Router>
);

export default Pages;
