import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createEvent, updateEvent } from "../../slices/eventslice";
import { uploadImageToCloudinary } from "../../cloudnary/cloudnary";
import { toast } from "react-hot-toast";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Stack,
  IconButton,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Close as CloseIcon } from "@mui/icons-material";

function EventForm({ open, onClose, event = null }) {
  const [formData, setFormData] = useState({
    title: event?.title || "",
    description: event?.description || "",
    date: event?.date ? new Date(event.date) : new Date(),
    location: event?.location || "",
    price: event?.price || "",
    image: event?.image || "",
  });
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, image: previewUrl }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = formData.image;

      if (imageFile) {
        imageUrl = await uploadImageToCloudinary(imageFile);
      }

      const eventData = {
        ...formData,
        image: imageUrl,
        price: Number(formData.price),
        date: formData.date.toISOString(),
      };

      if (event) {
        await dispatch(updateEvent({ id: event.id, data: eventData })).unwrap();
        toast.success("Event updated successfully");
      } else {
        await dispatch(createEvent(eventData)).unwrap();
        toast.success("Event created successfully");
      }

      onClose();
    } catch (error) {
      toast.error(error.message || "Failed to save event");
      console.error("Error saving event:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2, bgcolor: "primary.main", color: "white" }}>
        {event ? "Edit Event" : "Create New Event"}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "white",
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <Stack spacing={3}>
            <TextField
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              fullWidth
            />

            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={3}
              required
              fullWidth
            />

            <DateTimePicker
              label="Event Date & Time"
              value={formData.date}
              onChange={(newDate) =>
                setFormData((prev) => ({ ...prev, date: newDate }))
              }
              renderInput={(params) => (
                <TextField {...params} required fullWidth />
              )}
              sx={{ width: "100%" }}
            />

            <TextField
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              fullWidth
            />

            <TextField
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              required
              fullWidth
              InputProps={{
                startAdornment: "$",
                inputProps: { min: 0, step: 0.01 },
              }}
            />

            <Box>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{ mb: 2 }}
              >
                Upload Image
                <input
                  type="file"
                  hidden
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </Button>
              {formData.image && (
                <Box
                  sx={{
                    width: "100%",
                    height: 200,
                    borderRadius: 1,
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={formData.image}
                    alt="Preview"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              )}
            </Box>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 2, bgcolor: "grey.50" }}>
          <Button onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? "Saving..." : event ? "Update Event" : "Create Event"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default EventForm;
