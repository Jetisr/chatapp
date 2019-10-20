import { Button, Card, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useAuth } from "../hooks";

const LoginForm = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const { authorize } = useAuth();
  const history = useHistory();

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    authorize("has");
    history.push("/");
  };

  return (
    <Card>
      <Typography variant="h2">Login</Typography>
      <form onSubmit={handleLogin}>
        <TextField
          label="Login"
          id="user-login"
          placeholder="Email or username"
          value={login}
          onChange={({ target }) => {
            setLogin(target.value);
          }}
          autoComplete="email"
          variant="outlined"
          required
        />
        <TextField
          label="Password"
          id="user-password"
          value={password}
          onChange={({ target }) => {
            setPassword(target.value);
          }}
          autoComplete="current-password"
          variant="outlined"
          type="password"
          required
        />

        <Button type="submit" color="primary" variant="contained">
          Login
        </Button>
      </form>
    </Card>
  );
};

const UserAuth: React.FC = () => {
  const { authorized } = useAuth();

  if (authorized) {
    return <Redirect to="/" />;
  }

  return <LoginForm />;
};

export default UserAuth;
