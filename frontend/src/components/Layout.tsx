import { useQuery } from "@apollo/react-hooks";
import {
  AppBar,
  Button,
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
  const [menuOpen, setMenuOpen] = useState(false);
  const anchorElement = useRef<SVGSVGElement | null>(null);

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const handleMenuOpen = () => {
    setMenuOpen(true);
  };

  return (
    <>
      <AppBar position="sticky">
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
                <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
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
