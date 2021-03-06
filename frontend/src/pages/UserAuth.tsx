/* eslint-disable no-underscore-dangle */
import { useApolloClient, useMutation, useQuery } from "@apollo/react-hooks";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  createStyles,
  IconButton,
  InputAdornment,
  makeStyles,
  Snackbar,
  TextField,
  Theme,
  Typography,
  LinearProgress
} from "@material-ui/core";
import { VisibilityOffOutlined, VisibilityOutlined } from "@material-ui/icons";
import React, { useState } from "react";
import { Link, Redirect, Route, Switch, useHistory } from "react-router-dom";
import { CREATE_ACCOUNT, LOGIN } from "../graphql/mutations";
import { ME, IS_LOGGED_IN } from "../graphql/queries";
import { useSnackbar } from "../hooks";
import {
  CreateAccountMutation,
  CreateAccountMutationVariables,
  LoginMutation,
  LoginMutationVariables,
  IsLoggedInQuery
} from "../typescript/codegen";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      display: "flex",
      flexDirection: "column"
    },
    card: {
      padding: theme.spacing(2),
      flexGrow: 1
    },
    title: {
      marginBottom: theme.spacing(2),
      textAlign: "center"
    },
    textField: {
      marginBottom: theme.spacing(1)
    },
    buttons: {
      display: "flex",
      justifyContent: "center"
    }
  })
);

const Welcome: React.FC = () => {
  const classes = useStyles();
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h2" className={classes.title}>
        Welcome!
      </Typography>
      <ButtonGroup variant="contained" size="large" color="primary">
        <Button component={Link} to="/auth/login">
          Login
        </Button>
        <Button component={Link} to="/auth/create-account">
          Create Account
        </Button>
      </ButtonGroup>
    </Box>
  );
};

const CreateAccountForm: React.FC = () => {
  const client = useApolloClient();
  const history = useHistory();
  const [createAccountFunc, { loading: creatingAccount }] = useMutation<
    CreateAccountMutation,
    CreateAccountMutationVariables
  >(CREATE_ACCOUNT);
  const [loginFunc, { loading: loggingIn }] = useMutation<
    LoginMutation,
    LoginMutationVariables
  >(LOGIN);

  const { openSnackbar, snackbarProps } = useSnackbar();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const classes = useStyles();

  const handleAccountCreation = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const createAccountResult = await createAccountFunc({
      variables: { email, username, password, firstName, lastName }
    });

    if (
      createAccountResult.data &&
      !createAccountResult.data.createUser.success
    ) {
      openSnackbar(
        createAccountResult.data.createUser.message ||
          "There was a problem creating your account"
      );
      return;
    }

    const loginResult = await loginFunc({
      variables: { login: email, password }
    });

    if (loginResult.data && !loginResult.data.login.success) {
      openSnackbar(
        loginResult.data.login.message || "There was a problem logging in."
      );
      return;
    }

    if (
      createAccountResult.data &&
      createAccountResult.data.createUser.success &&
      createAccountResult.data.createUser.__typename === "CreateUserResult" &&
      loginResult.data &&
      loginResult.data.login.success &&
      loginResult.data.login.__typename === "LoginResult" &&
      loginResult.data.login.token
    ) {
      client.writeQuery({
        query: ME,
        data: { me: createAccountResult.data.createUser.user }
      });
      const { token } = loginResult.data.login;
      localStorage.setItem("token", token);
      client.writeData({ data: { isLoggedIn: true } });
      history.push("/");
    }
  };

  return (
    <>
      <Typography variant="h2" className={classes.title}>
        Create Account
      </Typography>
      <form onSubmit={handleAccountCreation} className={classes.form}>
        <TextField
          label="Username"
          id="user-username"
          value={username}
          onChange={({ target }) => {
            setUsername(target.value);
          }}
          autoComplete="username"
          variant="outlined"
          className={classes.textField}
          required
        />
        <TextField
          label="Email"
          id="user-email"
          value={email}
          onChange={({ target }) => {
            setEmail(target.value);
          }}
          autoComplete="email"
          variant="outlined"
          className={classes.textField}
          required
        />
        <TextField
          label="Password"
          id="user-password"
          value={password}
          onChange={({ target }) => {
            setPassword(target.value);
          }}
          autoComplete="new-password"
          variant="outlined"
          className={classes.textField}
          type={showPassword ? "text" : "password"}
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
        <TextField
          label="First Name"
          id="user-firstName"
          value={firstName}
          onChange={({ target }) => {
            setFirstName(target.value);
          }}
          autoComplete="given-name"
          variant="outlined"
          className={classes.textField}
        />

        <TextField
          label="Last Name"
          id="user-lastName"
          value={lastName}
          onChange={({ target }) => {
            setLastName(target.value);
          }}
          autoComplete="family-name"
          variant="outlined"
          className={classes.textField}
        />
        <Button
          disabled={loggingIn || creatingAccount}
          type="submit"
          color="primary"
          variant="contained"
        >
          Create Account
        </Button>
      </form>
      <Snackbar
        {...snackbarProps}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={6000}
      />
    </>
  );
};

const LoginForm: React.FC = () => {
  const client = useApolloClient();
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
      result.data.login.success &&
      result.data.login.__typename === "LoginResult" &&
      result.data.login.token
    ) {
      const { token } = result.data.login;
      localStorage.setItem("token", token);
      client.writeData({ data: { isLoggedIn: true } });
      history.push("/");
    } else {
      openSnackbar(
        (result.data && result.data.login.message) ||
          "There was an issue logging in"
      );
    }
  };

  return (
    <>
      <Typography variant="h2" className={classes.title}>
        Login
      </Typography>
      <form onSubmit={handleLogin} className={classes.form}>
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
          className={classes.textField}
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
          className={classes.textField}
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
    </>
  );
};

const UserAuth: React.FC = () => {
  const { data, loading } = useQuery<IsLoggedInQuery>(IS_LOGGED_IN);
  const classes = useStyles();

  if (loading) return <LinearProgress />;

  if (data && data.isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Card className={classes.card}>
        <Switch>
          <Route exact path="/auth">
            <Welcome />
          </Route>
          <Route path="/auth/login">
            <LoginForm />
          </Route>
          <Route path="/auth/create-account">
            <CreateAccountForm />
          </Route>
        </Switch>
      </Card>
    </Box>
  );
};

export default UserAuth;
