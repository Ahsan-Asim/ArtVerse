import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardActions,
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  IconButton,
  Avatar,
} from "@mui/material";
// Material Dashboard 2 React components
// import MDTypography from "./MDTypography";
// import MDBox from "./MDBox";
import { Settings, Upload, Home } from "@mui/icons-material";
import DefaultProfileIcon from "../assets/images/default_profile.jpeg";
import '../styles/ProfilePage/profile_main.css';
import socket from "../socket"; // Import socket instance


export const Profile_main = () => {
  const [userData, setUserData] = useState(null);
  const [roleData, setRoleData] = useState(null);
  const [editableData, setEditableData] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isVerified, setIsVerified] = useState(true);
  const [isBlocked, setIsBlocked] = useState(false);
  const [artistProfileImage, setArtistProfileImage] = useState("");
  const [artworks, setArtworks] = useState([]);
  const navigate = useNavigate();

  // const [notifications, setNotifications] = useState([]);

  // useEffect(() => {
  //   // Listen for new customization requests
  //   socket.on("newRequest", (data) => {
  //     setNotifications((prev) => [...prev, data]);
  //   });

  //   return () => {
  //     socket.off("newRequest"); // Cleanup on unmount
  //   };
  // }, []);

  useEffect(() => {
    const artistEmail = sessionStorage.getItem("email"); // Fetch email from sessionStorage
    if (artistEmail) {
      fetch(`http://localhost:4000/api/artist/image?email=${artistEmail}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.profileImage) setArtistProfileImage(data.profileImage);
        })
        .catch((err) => console.error("Error fetching artist data: ", err));

      // Fetch artworks for the artist
      axios
        .get(`http://localhost:4000/api/users/getUserByEmail/${artistEmail}`)
        .then((res) => {
          const user = res.data;
          if (user.artworks) {
            setArtworks(user.artworks);
          }
        })
        .catch((err) => console.error("Error fetching artworks:", err));
    }
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:4000/api/users/home", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          const user = response.data.user;
          setUserData(user);

          if (user.email) {
            axios
              .get(`http://localhost:4000/api/users/getUserByEmail/${user.email}`)
              .then((res) => {
                const fullData = res.data;
                setRoleData(fullData);
                const combinedData = {
                  ...fullData,
                  ...fullData.artistDetails,
                };
                setEditableData(combinedData);
                setOriginalData(combinedData);
                setIsVerified(fullData.isVerified);
                setIsBlocked(fullData.isBlocked);
              })
              .catch((error) => {
                console.error("Error fetching role data:", error);
              });
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableData({ ...editableData, [name]: value });
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:4000/api/users/updateData/${editableData.email}`,
        editableData
      );
      setRoleData(editableData);
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Error updating profile. Please try again.");
    }
  };

  const handleCancel = () => {
    setEditableData(originalData);
    setIsEditing(false);
  };

  const handleSettingsClick = () => {
    setIsEditing((prevState) => !prevState);
  };

  const handleUploadArtworkClick = () => {
    if (!isVerified) {
      alert("Your account is under verification. You cannot upload artwork yet.");
      navigate("/profile");
    } else if (isBlocked) {
      alert("Your account is blocked. You cannot upload artwork.");
      navigate("/profile");
    } else {
      navigate("/artist_studio");
    }
  };

  const handleHomeClick = () => {
    navigate("/home");
  };

  if (!userData || !roleData) {
    return <div>Loading...</div>;
  }

  return (
    <Box className="custom-profile-box">
      <Grid container spacing={4}>
        <Grid item xs={12} sm={4} container direction="column" alignItems="center" spacing={2} className="custom-profile-left">
          <img
            src={artistProfileImage ? `http://localhost:4000/${artistProfileImage}` : DefaultProfileIcon}
            alt="Profile"
            className="icon profile-icon"
          />
          <Button variant="contained" color="primary" className="custom-update-button">
            Update Picture
          </Button>
        </Grid>

        <Grid item xs={12} sm={8} container justifyContent="space-between" alignItems="center" spacing={2} className="custom-profile-right">
          <Grid item>
            <Typography variant="h5" className="custom-user-name">
              {userData.role === "artist" ? roleData.name : "User Name"}
            </Typography>
            <Typography variant="h6" className="custom-role">
              {roleData.role}
            </Typography>
          </Grid>

          <Grid item>
            <IconButton color="primary" className="custom-home-button" onClick={handleHomeClick}>
              <Home />
            </IconButton>
            <IconButton color="primary" className="custom-settings-button" onClick={handleSettingsClick}>
              <Settings />
            </IconButton>
            <IconButton color="secondary" className="custom-upload-button" onClick={handleUploadArtworkClick}>
              <Upload />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>

      <Typography variant="h3" className="custom-profile-info-title">
        Profile Information
      </Typography>
      <Card className="custom-profile-card">
        <CardContent>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={editableData?.name || ""}
                onChange={handleChange}
                disabled={!isEditing}
                className="custom-name-field"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={editableData?.email || ""}
                disabled
                className="custom-email-field"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Role"
                name="role"
                value={editableData?.role || ""}
                disabled
                className="custom-role-field"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={editableData?.phone || ""}
                onChange={handleChange}
                disabled={!isEditing}
                className="custom-phone-field"
              />
            </Grid>

            {userData.role === "artist" && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Country"
                    name="country"
                    value={editableData?.country || ""}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="custom-country-field"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="State"
                    name="state"
                    value={editableData?.state || ""}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="custom-state-field"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="City"
                    name="city"
                    value={editableData?.city || ""}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="custom-city-field"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={editableData?.address || ""}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="custom-address-field"
                  />
                </Grid>
              </>
            )}
          </Grid>
        </CardContent>
        <CardActions>
          {isEditing ? (
            <>
              <Button variant="contained" onClick={handleSave} className="custom-save-button">
                Save
              </Button>
              <Button variant="outlined" onClick={handleCancel} className="custom-cancel-button">
                Cancel
              </Button>
            </>
          ) : null}
        </CardActions>
      </Card>

      {/* About Section */}
      <Grid container spacing={4} className="custom-about-section">
        <Grid item xs={12} sm={6}>
          <Card className="custom-about-card">
            <Typography variant="h5" gutterBottom>
              About
            </Typography>
            <Typography variant="body1" className="custom-about-text">
              {roleData?.about || "No information available."}
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card className="custom-other-info-card">
            <Typography variant="h5" gutterBottom>
              Other Info
            </Typography>
            <Typography variant="body1" className="custom-other-info-text">
              Some additional information here.
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Display Artwork Grid */}
{userData.role === "artist" && artworks.length > 0 && (
  <Box mb={3}>
    <Typography variant="h4" fontWeight="bold" color="primary">
      My Artworks
    </Typography>
  </Box>
)}

<Grid container spacing={4}>
  {artworks.map((artwork, index) => (
    <Grid item xs={12} sm={6} md={4} key={index}>
      <Box
        component="div"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        p={2}
        borderRadius="lg"
        sx={{
          backgroundColor: "#fff",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: 24,
          },
        }}
      >
        <img
          src={`http://localhost:4000${artwork.image}`}
          alt={artwork.title}
          style={{
            width: "100%",
            maxHeight: "300px",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
        <Box mt={2} textAlign="center">
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {artwork.title}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {artwork.description}
          </Typography>
        </Box>
      </Box>
    </Grid>
  ))}
</Grid>




    </Box>
  );
};
