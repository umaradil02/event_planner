import React, { useEffect } from "react";
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

function UserDashboard() {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.events);
  const status = useSelector((state) => state.events.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchEvents());
    }
  }, [status, dispatch]);

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

        {status === "loading" ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="60vh"
          >
            <CircularProgress color="primary" size={60} />
          </Box>
        ) : (
          // Grid Layout for Event Cards
          <Grid container spacing={4}>
            {events.length > 0 ? (
              events.map((event) => (
                <Grid item key={event.id} xs={12} sm={6} md={4}>
                  <EventCard event={event} />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Box textAlign="center" mt={4}>
                  <Typography variant="h6" color="text.secondary">
                    No events available at the moment. Please check back later.
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        )}
      </Container>
    </Box>
  );
}

export default UserDashboard;
