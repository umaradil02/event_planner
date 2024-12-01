import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../slices/eventslice";
import EventForm from "./EventForm";
import EventList from "./EventList";
import { Box, Button, Container, Typography, Paper } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

function Admin() {
  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.events);
  const status = useSelector((state) => state.events.status);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setShowEventForm(true);
  };

  const handleCloseForm = () => {
    setShowEventForm(false);
    setSelectedEvent(null);
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "grey.100", py: 4 }}>
      <Container maxWidth="lg">
        <Paper
          sx={{
            p: 3,
            mb: 4,
            backgroundImage: "linear-gradient(to right, #6366f1, #8b5cf6)",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" component="h1" fontWeight="bold">
            Event Management Dashboard
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setShowEventForm(true)}
            sx={{
              bgcolor: "white",
              color: "primary.main",
              "&:hover": {
                bgcolor: "grey.100",
              },
            }}
          >
            Create New Event
          </Button>
        </Paper>

        {status === "loading" ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <Typography>Loading events...</Typography>
          </Box>
        ) : (
          <EventList events={events} onEdit={handleEditEvent} />
        )}

        <EventForm
          open={showEventForm}
          onClose={handleCloseForm}
          event={selectedEvent}
        />
      </Container>
    </Box>
  );
}

export default Admin;
