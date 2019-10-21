/* eslint-disable no-underscore-dangle */
import { useMutation } from "@apollo/react-hooks";
import {
  Button,
  Card,
  Snackbar,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  makeStyles,
  createStyles,
  Theme,
  Box
} from "@material-ui/core";
import { VisibilityOutlined, VisibilityOffOutlined } from "@material-ui/icons";
import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { LOGIN } from "../graphql/mutations";
import { useAuth, useSnackbar } from "../hooks";
import { LoginMutation, LoginMutationVariables } from "../typescript/codegen";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loginForm: {
      display: "flex",
      flexDirection: "column"
    },
    loginCard: {
      padding: theme.spacing(2),
      flexGrow: 1
    },
    loginTitle: {
      marginBottom: theme.spacing(2),
      textAlign: "center"
    },
    loginTextField: {
      marginBottom: theme.spacing(1)
    }
  })
);

const LoginForm = () => {
  const { authorize } = useAuth();
  const history = useHistory();
  const [loginFunc, { loading }] = useMutation<
    LoginMutation,
    LoginMutationVariables
  >(LOGIN);
  const { openSnackbar, snackbarProps } = useSnackbar();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const classes = useStyles();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await loginFunc({ variables: { login, password } });

    if (
      result.data &&
      result.data.login.data &&
      result.data.login.data.__typename === "Token" &&
      result.data.login.data.token
    ) {
      const { token } = result.data.login.data;
      authorize(token);
      history.push("/");
    } else {
      openSnackbar(
        (result.data && result.data.login.message) ||
          "There was an issue logging in"
      );
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Card className={classes.loginCard}>
        <Typography variant="h2" className={classes.loginTitle}>
          Login
        </Typography>
        <form onSubmit={handleLogin} className={classes.loginForm}>
          <TextField
            label="Login"
            id="user-login"
            placeholder="Username or email"
            value={login}
            onChange={({ target }) => {
              setLogin(target.value);
            }}
            autoComplete="email"
            variant="outlined"
            className={classes.loginTextField}
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
            type={showPassword ? "text" : "password"}
            className={classes.loginTextField}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(current => !current)}
                    onMouseDown={event => {
                      event.preventDefault();
                    }}
                  >
                    {showPassword ? (
                      <VisibilityOffOutlined />
                    ) : (
                      <VisibilityOutlined />
                    )}
                  </IconButton>
                </InputAdornment>
              )
            }}
            required
          />

          <Button
            disabled={loading}
            type="submit"
            color="primary"
            variant="contained"
          >
            Login
          </Button>
        </form>
        <Snackbar
          {...snackbarProps}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          autoHideDuration={6000}
        />
      </Card>
    </Box>
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
