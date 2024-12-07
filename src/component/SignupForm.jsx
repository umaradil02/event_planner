import React, { useState } from "react";
import { auth, db } from "../firebase/configure";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { Box, TextField, Button, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [firebaseError, setFirebaseError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors((prevState) => ({
      ...prevState,
      [name]: "",
    }));
  };

  const validateInputs = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Enter a valid email.";
    if (!formData.password.trim()) newErrors.password = "Password is required.";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFirebaseError("");
    if (!validateInputs()) return;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      await updateProfile(userCredential.user, {
        displayName: formData.name,
      });
      await setDoc(doc(db, "users", userCredential.user.uid), {
        name: formData.name,
        email: formData.email,
        isAdmin: false,
      });
    } catch (e) {
      setFirebaseError(e.message);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 300,
        margin: "20px auto",
        padding: 4,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="h5" textAlign="center" gutterBottom>
        Signup
      </Typography>
      <AnimatePresence>
        {firebaseError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            style={{
              padding: "8px",
              backgroundColor: "#f8d7da",
              color: "#721c24",
              border: "1px solid #f5c6cb",
              borderRadius: "4px",
              textAlign: "center",
            }}
          >
            {firebaseError}
          </motion.div>
        )}
      </AnimatePresence>
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={Boolean(errors.name)}
        helperText={errors.name}
        fullWidth
        required
      />
      <TextField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={Boolean(errors.email)}
        helperText={errors.email}
        fullWidth
        required
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        error={Boolean(errors.password)}
        helperText={errors.password}
        fullWidth
        required
      />
      <Button variant="contained" type="submit" fullWidth>
        Signup
      </Button>
    </Box>
  );
};

export default SignupForm;
