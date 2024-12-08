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

export const SearchBar = ({ searchTerm, onSearchChange }) => {
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
          placeholder="Search Events..."
          value={searchTerm}
          onChange={onSearchChange}
        />
      </Paper>
    </Box>
  );
};
