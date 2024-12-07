import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { CalendarToday, LocationOn } from "@mui/icons-material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { format } from "date-fns";

function EventCard({ event }) {
  return (
    <Card
      sx={{
        maxWidth: 300,
        boxShadow: 3,
        position: "relative",
        overflow: "hidden",
        transition: "transform 0.2s",
        "&:hover": { transform: "scale(1.05)" },
        "&:hover .priceChip": { opacity: 1, visibility: "visible" },
      }}
    >
      <CardMedia
        component="img"
        height="150"
        image={event.image || "https://via.placeholder.com/400x200"}
        alt={event.title}
      />

      <Box
        className="priceChip"
        sx={{
          position: "absolute",
          top: 120,
          right: 1,
          backgroundColor: "primary.main",
          color: "white",
          borderRadius: "5px",
          display: "flex",
          alignItems: "center",
          px: 1,
          py: 0.5,
          fontWeight: "bold",
          opacity: 0,
          visibility: "hidden",
          transition: "opacity 0.3s ease, visibility 0.3s ease",
        }}
      >
        <CurrencyRupeeIcon fontSize="small" sx={{ mr: 0.5 }} />
        Rs{event.price}
      </Box>

      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {event.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {event.description}
        </Typography>

        <Box mt={2}>
          <Box display="flex" alignItems="center" mb={1} color="text.secondary">
            <CalendarToday fontSize="small" sx={{ mr: 1 }} />
            <Typography variant="body2">
              {format(new Date(event.date), "PPP")}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" color="text.secondary">
            <LocationOn fontSize="small" sx={{ mr: 1 }} />
            <Typography variant="body2">{event.location}</Typography>
          </Box>
        </Box>
      </CardContent>

      <CardActions>
        <Button
          fullWidth
          component={Link}
          to={`/event/${event.id}`}
          variant="contained"
          color="primary"
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
}

export default EventCard;
