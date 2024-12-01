import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  Menu,
  MenuItem,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import EventAvailableSharpIcon from "@mui/icons-material/EventAvailableSharp";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase/configure";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { uploadImageToCloudinary } from "../cloudnary/cloudnary";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { isAdmin } from "./RouteCheker";

const DEFAULT_PROFILE_PIC = "https://via.placeholder.com/100x100?text=Avatar";

const Header = () => {
  const { logdinuser, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [newProfilePic, setNewProfilePic] = useState(DEFAULT_PROFILE_PIC);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (logdinuser) {
        try {
          const userDoc = await getDoc(doc(db, "users", logdinuser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            if (userData.profilePic) {
              setNewProfilePic(userData.profilePic);
            }
          }
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
        }
      }
    };

    fetchUserProfile();
  }, [logdinuser]);

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);

    try {
      const imageUrl = await uploadImageToCloudinary(file);
      await updateDoc(doc(db, "users", logdinuser.uid), {
        profilePic: imageUrl,
      });

      dispatch({
        type: "UPDATE_USER",
        payload: { profilePic: imageUrl },
      });

      setNewProfilePic(imageUrl);
      toast.success("Profile picture updated successfully!");
    } catch (error) {
      console.error("Image upload failed:", error);
      toast.error("Failed to upload profile picture.");
    } finally {
      setUploading(false);
    }
  };

  const handleProfileDialogOpen = () => {
    setProfileDialogOpen(true);
  };

  const handleProfileDialogClose = () => {
    setProfileDialogOpen(false);
  };

  // if (loading) {
  //   return (
  //     <CircularProgress sx={{ margin: "auto", display: "block", mt: 2 }} />
  //   );
  // }

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginRight: 2,
          }}
        >
          <EventAvailableSharpIcon
            sx={{
              fontSize: 40,
              color: "white",
            }}
          />
        </Box>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Next Event
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {logdinuser ? (
            !isAdmin(logdinuser) && (
              <>
                <Button color="inherit" component={Link} to="/dashboard">
                  My Dashboard
                </Button>
                <Button color="inherit" component={Link} to="/my-bookings">
                  My Booking
                </Button>
              </>
            )
          ) : (
            <>
              <Button color="inherit" component={Link} to="/loginform">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/signupform">
                Signup
              </Button>
            </>
          )}
          {logdinuser && (
            <Box
              onClick={handleMenuOpen}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
                position: "relative",
              }}
            >
              <Avatar
                src={newProfilePic || DEFAULT_PROFILE_PIC}
                sx={{ width: 50, height: 50 }}
              />
            </Box>
          )}
        </Box>
        <Menu
          anchorEl={menuAnchorEl}
          open={Boolean(menuAnchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleProfileDialogOpen}>Edit Profile</MenuItem>
          <MenuItem
            onClick={async () => {
              await signOut(auth);
              dispatch({ type: "LOGOUT" });
              handleMenuClose();
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
      <Dialog open={profileDialogOpen} onClose={handleProfileDialogClose}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Avatar
              src={newProfilePic || DEFAULT_PROFILE_PIC}
              sx={{ width: 100, height: 100 }}
            />
            <Typography variant="h6">
              {logdinuser?.displayName || "User"}
            </Typography>
            <Button variant="outlined" component="label" disabled={uploading}>
              {uploading ? "Uploading..." : "Upload New Picture"}
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={handleImageUpload}
              />
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleProfileDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
};

export default Header;
