import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../slices/eventslice";
import bacgroundimg from "../assets/background_img.avif";
import { Link } from "react-router-dom";

const WelcomePage = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.events);
  const status = useSelector((state) => state.events.status);
  const error = useSelector((state) => state.events.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchEvents());
    }
  }, [dispatch, status]);

  // Sort events by date (latest first) and take the top 3
  const latestEvents = [...events]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          height: "75vh",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "40px",
          background: "linear-gradient(to right, #3a0ca3, #7209b7, #f72585)",
          color: "white",
        }}
      >
        {/* Left Section: Image */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={bacgroundimg}
            alt="Event Management"
            style={{
              maxWidth: "90%",
              maxHeight: "80%",
              borderRadius: "16px",
              boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
            }}
          />
        </Box>

        {/* Right Section: Text and Button */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "left",
            padding: "20px",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              marginBottom: "16px",
              textShadow: "2px 2px 6px rgba(0, 0, 0, 0.3)",
            }}
          >
            Creating the Best.{" "}
            <span style={{ color: "#FFDD44" }}>Day. Ever.</span>
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: "18px",
              marginBottom: "24px",
              lineHeight: "1.6",
              textShadow: "1px 1px 3px rgba(0, 0, 0, 0.3)",
            }}
          >
            Manage your events seamlessly with our professional event management
            software. Organize, plan, and execute events effortlessly with
            features designed to simplify your workflow.
          </Typography>
          <Link to="/loginform">
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#FF6D00",
                color: "white",
                padding: "12px 24px",
                fontSize: "16px",
                fontWeight: "bold",
                borderRadius: "8px",
                textTransform: "none",
              }}
            >
              Get Started
            </Button>
          </Link>
        </Box>
      </Box>

      {/* Events Section */}
      <Box sx={{ padding: "40px", backgroundColor: "#1a1a1a", color: "white" }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", textAlign: "center", marginBottom: "24px" }}
        >
          Explore Our Live Events
        </Typography>

        {status === "loading" && (
          <Typography variant="body1" align="center">
            Loading events...
          </Typography>
        )}

        {status === "failed" && (
          <Typography variant="body1" align="center" color="error">
            Error fetching events: {error}
          </Typography>
        )}

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "16px",
          }}
        >
          {latestEvents.map((event) => (
            <Card
              key={event.id}
              sx={{
                width: "300px",
                borderRadius: "16px",
                backgroundColor: "#2a2a2a",
                color: "white",
                overflow: "hidden",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              {event.image && (
                <CardMedia
                  component="div"
                  sx={{
                    height: "180px",
                    backgroundImage: `url(${event.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.1)",
                    },
                  }}
                />
              )}
              <CardContent
                sx={{
                  textAlign: "center",
                  padding: "16px",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    marginBottom: "8px",
                  }}
                >
                  {event.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "gray", marginBottom: "8px" }}
                >
                  {new Date(event.date).toLocaleDateString()}
                </Typography>
                <Typography variant="body2">{event.description}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default WelcomePage;
