import React from "react";
import {
  Paper,
  InputBase,
  IconButton,
  Select,
  MenuItem,
  Box,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Search } from "@mui/icons-material";

export const SearchBar = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}) => {
  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <Paper
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          flexGrow: 1,
        }}
      >
        <IconButton sx={{ p: "10px" }} aria-label="search">
          <Search />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search bookings..."
          value={searchTerm}
          onChange={onSearchChange}
        />
      </Paper>

      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel id="status-filter-label">Status</InputLabel>
        <Select
          labelId="status-filter-label"
          value={statusFilter}
          label="Status"
          onChange={onStatusFilterChange}
        >
          <MenuItem value="all">All Status</MenuItem>
          <MenuItem value="confirmed">Confirmed</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="cancelled">Cancelled</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
