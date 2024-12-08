import React, { useEffect, useState } from "react";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { db } from "../../firebase/configure";
import { Typography, Box, Paper, Button } from "@mui/material";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "bookings"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const bookingdata = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(bookingdata);

      setBookings(bookingdata);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Admin - All Bookings
      </Typography>

      {bookings.length === 0 ? (
        <Typography>No bookings yet!</Typography>
      ) : (
        bookings.map((booking) => (
          <Paper key={booking.id} sx={{ padding: 2, marginBottom: 2 }}>
            <Typography variant="h6">{booking?.eventTitle}</Typography>
            <Typography variant="body1">
              Date: {new Date(booking?.eventDate).toLocaleString()}
            </Typography>
            <Typography variant="body1">
              BookingDate: {new Date(booking?.bookingDate).toLocaleString()}
            </Typography>
            <Typography variant="body2">
              Booked by: {booking.UserName} ({booking.userEmail})
            </Typography>
            <Typography variant="body2">Status: {booking.status}</Typography>
            <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
              View Details
            </Button>
          </Paper>
        ))
      )}
    </Box>
  );
};

export default Bookings;
