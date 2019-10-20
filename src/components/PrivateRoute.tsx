import React from "react";
import { Redirect, Route, RouteProps, useLocation } from "react-router-dom";
import { useAuth } from "../hooks";

const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const location = useLocation();
  const { authorized } = useAuth();
  return (
    <Route {...rest}>
      {authorized ? (
        children
      ) : (
        <Redirect to={{ pathname: "/auth", state: { from: location } }} />
      )}
    </Route>
  );
};

export default PrivateRoute;
