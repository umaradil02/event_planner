import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../slices/eventslice";
import EventCard from "./EventCard";
import {
  Box,
  Container,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";
import { SearchBar } from "./SearchBar";
import { EmptyState } from "./EmptyState";

function UserDashboard() {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.events);
  const status = useSelector((state) => state.events.status);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchEvents());
    }
  }, [status, dispatch]);

  const filterevent = events.filter((event) => {
    const matchesSearch =
      event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  return (
    <Box
      sx={{
        minHeight: "70vh",
        bgcolor: "background.default",
        py: 3,
      }}
    >
      <Container maxWidth="lg">
        <Box textAlign="center" mb={4}>
          <Typography
            variant="h4"
            component="h1"
            fontWeight="bold"
            gutterBottom
          >
            Upcoming Events
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Discover and book amazing events in your area
          </Typography>
        </Box>
        <Box sx={{ mb: 4 }}>
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>
        {status === "loading" ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="60vh"
          >
            <CircularProgress color="primary" size={60} />
          </Box>
        ) : filterevent.length === 0 ? (
          <EmptyState />
        ) : (
          <Grid container spacing={3}>
            {filterevent.map((event) => (
              <Grid item xs={12} sm={6} md={4} key={event.id}>
                <EventCard event={event} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}

export default UserDashboard;
