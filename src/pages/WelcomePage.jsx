import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import bacgroundimg from "../assets/background_img.avif";
import { Link } from "react-router-dom";

const WelcomePage = () => {
  return (
    <Box
      sx={{
        height: "75vh",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "40px",
        background: "linear-gradient(to right, #3a0ca3, #7209b7, #f72585)",
        color: "white",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={bacgroundimg}
          alt="Event Management"
          style={{
            maxWidth: "90%",
            maxHeight: "80%",
            borderRadius: "16px",
            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
          }}
        />
      </Box>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "left",
          padding: "20px",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            marginBottom: "16px",
            textShadow: "2px 2px 6px rgba(0, 0, 0, 0.3)",
          }}
        >
          Planning <span style={{ color: "#FFDD44" }}>Software</span>
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: "18px",
            marginBottom: "24px",
            lineHeight: "1.6",
            textShadow: "1px 1px 3px rgba(0, 0, 0, 0.3)",
          }}
        >
          Manage your events seamlessly with our professional event management
          software. Organize, plan, and execute events effortlessly with
          features designed to simplify your workflow.
        </Typography>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ display: "inline-block" }}
        >
          <Link to="/loginform">
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#FF6D00",
                color: "white",
                padding: "12px 24px",
                fontSize: "16px",
                fontWeight: "bold",
                borderRadius: "8px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                textTransform: "none",
              }}
            >
              Get Started
            </Button>
          </Link>
        </motion.div>
      </Box>
    </Box>
  );
};

export default WelcomePage;
