import { useQuery } from "@apollo/react-hooks";
import { LinearProgress } from "@material-ui/core";
import React from "react";
import { Redirect, Route, RouteProps, useLocation } from "react-router-dom";
import { IS_LOGGED_IN } from "../graphql/queries";
import { IsLoggedInQuery } from "../typescript/codegen";

const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const location = useLocation();
  const { data, loading } = useQuery<IsLoggedInQuery>(IS_LOGGED_IN);

  if (loading) return <LinearProgress />;

  return (
    <Route {...rest}>
      {data && data.isLoggedIn ? (
        children
      ) : (
        <Redirect to={{ pathname: "/auth", state: { from: location } }} />
      )}
    </Route>
  );
};

export default PrivateRoute;
