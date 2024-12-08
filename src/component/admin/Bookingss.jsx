import React, { useState, useEffect } from "react";
import { Container, Typography, Grid, Box } from "@mui/material";
import { BookingCard } from "./BookingCard";
import { EmptyState } from "./EmptyState";
import { SearchBar } from "./SearchBar";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/configure";

function Bookingss() {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const q = query(collection(db, "bookings"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const bookingData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBookings(bookingData);
    });

    return () => unsubscribe();
  }, []);

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.eventTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.UserName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.UserEmail?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      booking.status?.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ textAlign: "center" }}
        >
          Bookings Detail
        </Typography>

        <Box sx={{ mb: 4 }}>
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={(e) => setSearchTerm(e.target.value)}
            statusFilter={statusFilter}
            onStatusFilterChange={(e) => setStatusFilter(e.target.value)}
          />
        </Box>

        {filteredBookings.length === 0 ? (
          <EmptyState />
        ) : (
          <Grid container spacing={3}>
            {filteredBookings.map((booking) => (
              <Grid item xs={12} sm={6} md={4} key={booking.id}>
                <BookingCard booking={booking} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}

export default Bookingss;
