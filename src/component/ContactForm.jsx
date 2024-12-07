import React from "react";
import { Box, Typography, TextField, Button, Grid, Stack } from "@mui/material";
import { useForm } from "react-hook-form";

const ContactForm = () => {
  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Form submit handler
  const onSubmit = (data) => {
    // Formspree action URL
    console.log(data);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        py: 6,
        px: 3,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h4"
        component="h2"
        sx={{ mb: 4, fontWeight: "bold", textAlign: "center" }}
      >
        Contact <span style={{ color: "#1976d2" }}>Me!</span>
      </Typography>

      <Box
        component="form"
        action="https://formspree.io/f/mpzvewvl"
        method="post"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ width: "100%", maxWidth: 600 }}
      >
        {/* Name and Email Inputs */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              {...register("name", { required: "Full Name is required" })}
              error={!!errors.name}
              helperText={errors.name ? errors.name.message : ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email Address"
              variant="outlined"
              fullWidth
              {...register("email", {
                required: "Email Address is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address",
                },
              })}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ""}
            />
          </Grid>
        </Grid>

        {/* Mobile Number and Subject Inputs */}
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Mobile Number"
              variant="outlined"
              fullWidth
              type="number"
              {...register("number", { required: "Mobile Number is required" })}
              error={!!errors.number}
              helperText={errors.number ? errors.number.message : ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email Subject"
              variant="outlined"
              fullWidth
              {...register("subject", {
                required: "Email Subject is required",
              })}
              error={!!errors.subject}
              helperText={errors.subject ? errors.subject.message : ""}
            />
          </Grid>
        </Grid>

        {/* Message Input */}
        <Stack sx={{ mt: 2 }} spacing={2}>
          <TextField
            label="Your Message"
            variant="outlined"
            fullWidth
            multiline
            rows={6}
            {...register("message", { required: "Message is required" })}
            error={!!errors.message}
            helperText={errors.message ? errors.message.message : ""}
          />
        </Stack>

        {/* Submit Button */}
        <Box sx={{ mt: 3 }}>
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Send Message
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ContactForm;
