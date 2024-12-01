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
        zIndex: 1300,
      }}
    >
      <Typography variant="body1">
        © {new Date().getFullYear()} Next Event
      </Typography>
    </Box>
  );
};

export default Footer;
