import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/configure";
import { useSelector } from "react-redux";
import { format, parseISO, isValid } from "date-fns";
import { Typography, Paper, Box, Button } from "@mui/material";
import { jsPDF } from "jspdf";
import QRCode from "qrcode";
import { motion } from "framer-motion"; // Import Framer Motion

const BookedEvents = () => {
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

  const formatDate = (date) => {
    const parsedDate = parseISO(date);
    if (!isValid(parsedDate)) {
      return "Invalid Date";
    }
    return format(parsedDate, "PPP");
  };

  const generateQRCode = async (booking) => {
    const eventDetails = `Event: ${booking.eventTitle}\nDate: ${formatDate(
      booking.eventDate
    )}\nPurchaser: ${logdinuser?.name || "User"}`;
    try {
      const qrCodeDataUrl = await QRCode.toDataURL(eventDetails);
      return qrCodeDataUrl;
    } catch (error) {
      console.error("Error generating QR code:", error);
      return null;
    }
  };

  const loadImage = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = url;
      img.onload = () => resolve(img);
      img.onerror = (err) => reject(err);
    });
  };

  const downloadTicket = async (booking) => {
    const pdf = new jsPDF("landscape", "mm", [100, 250]);

    pdf.setFillColor(240, 240, 240);
    pdf.roundedRect(5, 5, 240, 90, 5, 5, "F");

    if (booking.eventImage) {
      try {
        const img = await loadImage(booking.eventImage);
        pdf.addImage(img, "JPEG", 10, 10, 50, 50);
      } catch (err) {
        console.error("Error loading event image:", err);
      }
    }

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(20);
    pdf.text(70, 20, booking.eventTitle);

    pdf.setFontSize(12);
    pdf.setFont("helvetica", "normal");
    pdf.text(70, 30, `Date: ${formatDate(booking.eventDate)}`);
    pdf.text(70, 40, `Status: ${booking.status}`);
    pdf.text(70, 50, `Purchaser: ${logdinuser?.name || "User"}`);

    const qrCode = await generateQRCode(booking);
    if (qrCode) {
      pdf.addImage(qrCode, "PNG", 190, 10, 40, 40);
    }

    pdf.save(`${booking.eventTitle}-ticket.pdf`);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 6,
        px: 3,
        bgcolor: "background.default",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={{ maxWidth: "lg", width: "100%" }}>
        <Typography variant="h4" gutterBottom textAlign="center">
          My Bookings
        </Typography>

        {bookings.length === 0 ? (
          <Typography variant="body1" color="text.secondary" align="center">
            No bookings found.
          </Typography>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              justifyContent: "center",
            }}
          >
            {bookings.map((booking) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.2)",
                }}
                style={{ flexBasis: "300px", maxWidth: "280px" }}
              >
                <Paper
                  elevation={4}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    minHeight: "300px",
                  }}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    textAlign="center"
                    sx={{ fontWeight: "bold" }}
                  >
                    {booking.eventTitle}
                  </Typography>
                  {booking.eventImage && (
                    <Box
                      component="img"
                      src={booking.eventImage}
                      alt={booking.eventTitle}
                      sx={{
                        width: "100%",
                        height: "150px",
                        borderRadius: 2,
                        mb: 2,
                        objectFit: "cover",
                      }}
                    />
                  )}

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    textAlign="center"
                    gutterBottom
                  >
                    Event Date: {formatDate(booking.eventDate)}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    textAlign="center"
                    gutterBottom
                  >
                    Booked On: {formatDate(booking.bookingDate)}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    textAlign="center"
                    gutterBottom
                  >
                    Status: {booking.status}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: "auto", width: "100%" }}
                    onClick={() => downloadTicket(booking)}
                  >
                    Download Ticket
                  </Button>
                </Paper>
              </motion.div>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default BookedEvents;
