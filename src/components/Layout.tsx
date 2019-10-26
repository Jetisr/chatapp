import { useQuery } from "@apollo/react-hooks";
import {
  AppBar,
  Button,
  Container,
  createStyles,
  IconButton,
  makeStyles,
  Toolbar,
  Typography
} from "@material-ui/core";
import { AccountCircleOutlined } from "@material-ui/icons";
import React from "react";
import { IsLoggedInQuery } from "../typescript/codegen";
import { IS_LOGGED_IN } from "../graphql/queries";

const useStyles = makeStyles(() =>
  createStyles({
    title: {
      flexGrow: 1
    }
  })
);

const Layout: React.FC = ({ children }) => {
  const { data, loading } = useQuery<IsLoggedInQuery>(IS_LOGGED_IN);
  const classes = useStyles();
  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Chat App
          </Typography>
          {!loading && data && data.isLoggedIn && (
            <IconButton color="inherit">
              <AccountCircleOutlined />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">{children}</Container>
    </>
  );
};

export default Layout;
