import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import logo from "../assets/event-logo.ico";

const Header = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Box
          component="img"
          src={logo}
          alt="Event Logo"
          sx={{ height: 40, marginRight: 2 }}
        />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Next Event Manager
        </Typography>
        <Box>
          <Button color="inherit" href="/dashboard">
            Dashboard
          </Button>
          <Button color="inherit" href="/loginform">
            Login
          </Button>
          <Button color="inherit" href="/signupform">
            Signup
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
