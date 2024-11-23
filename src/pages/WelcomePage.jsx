import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Modal,
  TextField,
  Container,
} from "@mui/material";

const WelcomePage = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // Mock login logic
    console.log("Login form submitted");
    setOpen(false);
    window.location.href = "/dashboard"; // Redirect to dashboard
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Typography variant="h2" gutterBottom>
        Welcome to My App
      </Typography>
      <Typography variant="h6" gutterBottom>
        Manage your events seamlessly with our professional event manager
        system.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={handleOpen}
        sx={{ mt: 3 }}
      >
        Login
      </Button>

      {/* Login Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Login
            </Button>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default WelcomePage;
