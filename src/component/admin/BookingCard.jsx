import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Chip,
  Stack,
  Box,
} from "@mui/material";
import { CalendarMonth, AccessTime, Person, Email } from "@mui/icons-material";
import { StatusChip } from "./StatusChip";
import { InfoRow } from "./InfowRow";

export const BookingCard = ({ booking }) => {
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {booking.eventImage && (
        <CardMedia
          component="img"
          height="200"
          image={booking?.eventImage}
          alt={booking.eventTitle}
        />
      )}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          {booking?.eventTitle}
        </Typography>

        <Stack spacing={2} sx={{ mt: 2 }}>
          <InfoRow
            icon={<CalendarMonth />}
            text={new Date(booking?.eventDate).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          />

          <InfoRow
            icon={<AccessTime />}
            text={`Booked: ${new Date(
              booking?.bookingDate
            ).toLocaleDateString()}`}
          />

          <InfoRow icon={<Person />} text={booking?.UserName} />

          <InfoRow icon={<Email />} text={booking?.UserEmail} />

          <Box>
            <StatusChip status={booking?.status} />
          </Box>
        </Stack>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button variant="contained" fullWidth sx={{ mr: 1 }}>
          View Details
        </Button>
        <Button variant="outlined" fullWidth>
          Contact User
        </Button>
      </CardActions>
    </Card>
  );
};
