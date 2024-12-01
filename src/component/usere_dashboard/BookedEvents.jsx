import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/configure";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import {
  Typography,
  Paper,
  Box,
  Grid,
  Chip,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

function BookedEvents() {
  const [bookings, setBookings] = useState([]);
  const { logdinuser } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!logdinuser) return;

      const q = query(
        collection(db, "bookings"),
        where("userId", "==", logdinuser.uid)
      );

      const snapshot = await getDocs(q);
      setBookings(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    };

    fetchBookings();
  }, [logdinuser]);

  return (
    <Box
      sx={{ minHeight: "100vh", py: 6, px: 3, bgcolor: "background.default" }}
    >
      <Box sx={{ maxWidth: "lg", mx: "auto" }}>
        <Typography variant="h4" gutterBottom>
          My Bookings
        </Typography>

        <Paper elevation={3} sx={{ mt: 4, p: 2 }}>
          {bookings.length === 0 ? (
            <Typography variant="body1" color="text.secondary" align="center">
              No bookings found.
            </Typography>
          ) : (
            <List>
              {bookings.map((booking) => (
                <React.Fragment key={booking.id}>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={
                        <Typography variant="h6">
                          {booking.eventTitle}
                        </Typography>
                      }
                      secondary={
                        <Typography variant="body2" color="text.secondary">
                          Booked on{" "}
                          {format(new Date(booking.bookingDate), "PPP")}
                        </Typography>
                      }
                    />
                    <Chip
                      label={booking.status}
                      color={
                        booking.status === "confirmed" ? "success" : "warning"
                      }
                      variant="outlined"
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          )}
        </Paper>
      </Box>
    </Box>
  );
}

export default BookedEvents;
