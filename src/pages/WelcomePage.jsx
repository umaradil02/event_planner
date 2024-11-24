import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import LoginForm from "../component/LoginForm";

const WelcomePage = () => {
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
      <Link
        to="/loginform"
        style={{
          marginTop: "24px",
          textDecoration: "none",
          color: "white",
        }}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{
            padding: "10px 20px",
            backgroundColor: "#1976d2",
            borderRadius: "4px",
            fontSize: "16px",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Login
        </motion.div>
      </Link>
    </Box>
  );
};

export default WelcomePage;
