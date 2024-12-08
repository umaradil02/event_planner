import React from "react";
import { Chip } from "@mui/material";
import { CheckCircle, Pending, Cancel } from "@mui/icons-material";

const statusConfig = {
  confirmed: {
    color: "success",
    icon: <CheckCircle />,
  },
  pending: {
    color: "warning",
    icon: <Pending />,
  },
  cancelled: {
    color: "error",
    icon: <Cancel />,
  },
};

export const StatusChip = ({ status }) => {
  const config = statusConfig[status.toLowerCase()] || statusConfig.pending;

  return (
    <Chip
      icon={config.icon}
      label={status}
      color={config.color}
      variant="outlined"
    />
  );
};
