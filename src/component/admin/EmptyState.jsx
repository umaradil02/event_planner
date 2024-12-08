import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { EventNote } from "@mui/icons-material";

export const EmptyState = () => {
  return (
    <Paper sx={{ p: 4, textAlign: "center" }}>
      <EventNote sx={{ fontSize: 60, color: "text.secondary", mb: 2 }} />
      <Typography variant="h6" gutterBottom>
        No Bookings Yet
      </Typography>
      <Typography variant="body2" color="text.secondary">
        When users make bookings, they will appear here.
      </Typography>
    </Paper>
  );
};
