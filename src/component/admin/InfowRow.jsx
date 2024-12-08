import React from "react";
import { Box, Typography } from "@mui/material";

export const InfoRow = ({ icon, text }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
    {React.cloneElement(icon, { color: "action", fontSize: "small" })}
    <Typography variant="body2" color="text.secondary">
      {text}
    </Typography>
  </Box>
);
