import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/configure";
import {
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Box,
  Button,
  Paper,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { CalendarToday, LocationOn } from "@mui/icons-material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { format } from "date-fns";

function EventDetails() {
  const { id } = useParams();
  const eventFromStore = useSelector((state) =>
    state.events.events.find((event) => event.id === id)
  );
  const { logdinuser } = useSelector((state) => state.auth);
  const [event, setEvent] = useState(eventFromStore);
  const [loading, setLoading] = useState(!eventFromStore);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [enteredAmount, setEnteredAmount] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const eventDoc = await getDoc(doc(db, "events", id));
        if (eventDoc.exists()) {
          setEvent({ id: eventDoc.id, ...eventDoc.data() });
        } else {
          toast.error("Event not found.");
        }
      } catch (error) {
        console.error("Error fetching event:", error);
        toast.error("Failed to fetch event.");
      } finally {
        setLoading(false);
      }
    };

    if (!eventFromStore) {
      fetchEvent();
    }
  }, [id, eventFromStore]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!event) {
    return (
      <Typography variant="h5" align="center">
        Event not found
      </Typography>
    );
  }

  const handlePayment = () => {
    if (Number(enteredAmount) === Number(event.price)) {
      handleBooking();
      setIsModalOpen(false);
      toast.success("Payment successful! Booking confirmed.");
    } else {
      toast.error("Entered amount does not match the event price.");
    }
  };

  const handleBooking = async () => {
    try {
      const bookingRef = collection(db, "bookings");
      const userBookingsSnapshot = await getDocs(
        query(
          bookingRef,
          where("eventId", "==", event.id),
          where("userId", "==", logdinuser.uid)
        )
      );

      if (!userBookingsSnapshot.empty) {
        toast.error("You have already booked this event!");
        return;
      }

      await addDoc(bookingRef, {
        eventId: event.id,
        userId: logdinuser.uid,
        UserName: logdinuser?.name,
        UserEmail: logdinuser?.email,
        eventTitle: event.title,
        bookingDate: new Date().toISOString(),
        eventDate: event.date,
        eventImage: event.image,
        status: "confirmed",
      });
    } catch (error) {
      toast.error("Failed to book event");
      console.error("Booking error:", error);
    }
  };

  return (
    <Box
      sx={{ minHeight: "80vh", py: 6, px: 2, bgcolor: "background.default" }}
    >
      <Paper
        elevation={3}
        sx={{ maxWidth: "sm", mx: "auto", overflow: "hidden" }}
      >
        <CardMedia
          component="img"
          height="250"
          image={event.image || "https://via.placeholder.com/800x400"}
          alt={event.title}
        />
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>
            {event.title}
          </Typography>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
              <Box mb={2}>
                <Box display="flex" alignItems="center" mb={1}>
                  <CalendarToday fontSize="small" sx={{ mr: 1 }} />
                  <Typography variant="body1" color="text.secondary">
                    {format(new Date(event.date), "PPP")}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" mb={1}>
                  <LocationOn fontSize="small" sx={{ mr: 1 }} />
                  <Typography variant="body1" color="text.secondary">
                    {event.location}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <CurrencyRupeeIcon fontSize="small" sx={{ mr: 1 }} />
                  <Typography variant="body1" color="text.secondary">
                    Rs{event.price}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: 3,
                  borderRadius: 2,
                  bgcolor: "primary.main",
                  color: "white",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Rs {event.price}
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  fullWidth
                  onClick={() => setIsModalOpen(true)}
                  sx={{ mt: 2 }}
                >
                  Book Now
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
              About This Event
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {event.description}
            </Typography>
          </Box>
        </CardContent>
      </Paper>

      {/* Payment Modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DialogTitle>Enter Payment Amount</DialogTitle>
        <DialogContent>
          <TextField
            type="number"
            label="Amount"
            fullWidth
            variant="outlined"
            value={enteredAmount}
            onChange={(e) => setEnteredAmount(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
          <Button onClick={handlePayment} color="primary">
            Pay
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default EventDetails;
