import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        bgcolor: "primary.main",
        color: "white",
        py: 2,
        textAlign: "center",
        zIndex: 1300, // Ensures it stays above other elements
      }}
    >
      <Typography variant="body1">
        © {new Date().getFullYear()} Event Manager
      </Typography>
    </Box>
  );
};

export default Footer;
