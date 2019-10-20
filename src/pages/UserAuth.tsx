import React from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "../hooks";

const UserAuth: React.FC = () => {
  const { authorized } = useAuth();

  if (authorized) {
    return <Redirect to="/" />;
  }

  return <div>UserAuth</div>;
};

export default UserAuth;
