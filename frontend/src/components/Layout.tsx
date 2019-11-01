import { useQuery, useApolloClient, useMutation } from "@apollo/react-hooks";
import {
  AppBar,
  Container,
  createStyles,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from "@material-ui/core";
import { AccountCircleOutlined } from "@material-ui/icons";
import React, { useState, useRef } from "react";
import { IsLoggedInQuery, LogoutMutation } from "../typescript/codegen";
import { IS_LOGGED_IN } from "../graphql/queries";
import { LOGOUT } from "../graphql/mutations";

const useStyles = makeStyles(() =>
  createStyles({
    title: {
      flexGrow: 1
    }
  })
);

const Layout: React.FC = ({ children }) => {
  const client = useApolloClient();
  const { data, loading } = useQuery<IsLoggedInQuery>(IS_LOGGED_IN);
  const classes = useStyles();
  const [menuOpen, setMenuOpen] = useState(false);
  const anchorElement = useRef<SVGSVGElement | null>(null);
  const [logout] = useMutation<LogoutMutation>(LOGOUT);

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const handleMenuOpen = () => {
    setMenuOpen(true);
  };

  const handleLogout = async () => {
    handleMenuClose();
    await logout();
    client.resetStore();
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Chat App
          </Typography>
          {!loading && data && data.isLoggedIn && (
            <>
              <IconButton color="inherit" onClick={handleMenuOpen}>
                <AccountCircleOutlined ref={anchorElement} />
              </IconButton>
              <Menu
                anchorEl={anchorElement.current}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
                keepMounted
                open={menuOpen}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">{children}</Container>
    </>
  );
};

export default Layout;
