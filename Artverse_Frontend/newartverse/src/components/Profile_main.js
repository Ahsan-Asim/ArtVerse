import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/profile_main.css";

const Profile_main = () => {
  const [userData, setUserData] = useState(null);
  const [roleData, setRoleData] = useState(null);
  const [editableData, setEditableData] = useState(null);
  const [originalData, setOriginalData] = useState(null); // Added state for original data
  const [isEditing, setIsEditing] = useState(false);
  const [isVerified, setIsVerified] = useState(true);
  const [isBlocked, setIsBlocked] = useState(false);
  const navigate = useNavigate();

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
              .get(
                `http://localhost:4000/api/users/getUserByEmail/${user.email}`
              )
              .then((res) => {
                const fullData = res.data;
                setRoleData(fullData);
                const combinedData = {
                  ...fullData,
                  ...fullData.artistDetails,
                };
                setEditableData(combinedData);
                setOriginalData(combinedData); // Save original data
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
    setEditableData(originalData); // Revert to the original data
    setIsEditing(false);
  };

  const handleUploadArtworkClick = () => {
    if (!isVerified) {
      alert(
        "Your account is under verification. You cannot upload artwork yet."
      );
      navigate("/profile");
    } else if (isBlocked) {
      alert("Your account is blocked. You cannot upload artwork.");
      navigate("/profile");
    } else {
      navigate("/artist_studio");
    }
  };

  if (!userData || !roleData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h2 className="header">
        {userData.role === "artist" ? `${roleData.name}'s` : "User"} Profile
      </h2>
      <form className="form">
        {/* Common Fields for Both User and Artist */}
        <div className="fieldContainer">
          <label className="label">Name:</label>
          <input
            type="text"
            name="name"
            value={editableData?.name || ""}
            onChange={handleChange}
            disabled={!isEditing}
            className="input"
          />
        </div>
        <div className="fieldContainer">
          <label className="label">Email:</label>
          <input
            type="email"
            name="email"
            value={editableData?.email || ""}
            onChange={handleChange}
            disabled
            className="input"
          />
        </div>
        <div className="fieldContainer">
          <label className="label">Role:</label>
          <input
            type="text"
            name="role"
            value={editableData?.role || ""}
            onChange={handleChange}
            disabled
            className="input"
          />
        </div>
        <div className="fieldContainer">
          <label className="label">Phone:</label>
          <input
            type="text"
            name="phone"
            value={editableData?.phone || ""}
            onChange={handleChange}
            disabled={!isEditing}
            className="input"
          />
        </div>

        {/* Additional Fields for Artists Only */}
        {userData.role === "artist" && (
          <>
            <div className="fieldContainer">
              <label className="label">Country:</label>
              <input
                type="text"
                name="country"
                value={editableData?.country || ""}
                onChange={handleChange}
                disabled={!isEditing}
                className="input"
              />
            </div>
            <div className="fieldContainer">
              <label className="label">State:</label>
              <input
                type="text"
                name="state"
                value={editableData?.state || ""}
                onChange={handleChange}
                disabled={!isEditing}
                className="input"
              />
            </div>
            <div className="fieldContainer">
              <label className="label">City:</label>
              <input
                type="text"
                name="city"
                value={editableData?.city || ""}
                onChange={handleChange}
                disabled={!isEditing}
                className="input"
              />
            </div>
            <div className="fieldContainer">
              <label className="label">Address:</label>
              <input
                type="text"
                name="address"
                value={editableData?.address || ""}
                onChange={handleChange}
                disabled={!isEditing}
                className="input"
              />
            </div>
            <div className="fieldContainer">
              <label className="label">Education:</label>
              <input
                type="text"
                name="education"
                value={editableData?.education || ""}
                onChange={handleChange}
                disabled={!isEditing}
                className="input"
              />
            </div>
            <div className="fieldContainer">
              <label className="label">About:</label>
              <textarea
                name="about"
                value={editableData?.about || ""}
                onChange={handleChange}
                disabled={!isEditing}
                className="input"
                style={{ height: "80px" }}
              />
            </div>
            <div className="fieldContainer">
              <label className="label">Awards:</label>
              <input
                type="text"
                name="awards"
                value={editableData?.awards || ""}
                onChange={handleChange}
                disabled={!isEditing}
                className="input"
              />
            </div>
            <div className="fieldContainer">
              <label className="label">Certificates:</label>
              <input
                type="text"
                name="certificates"
                value={editableData?.certificates || ""}
                onChange={handleChange}
                disabled={!isEditing}
                className="input"
              />
            </div>
          </>
        )}

        <div className="button-container">
          {isEditing ? (
            <>
              <button type="button" className="button" onClick={handleSave}>
                Save
              </button>
              <button type="button" className="button" onClick={handleCancel}>
                Cancel
              </button>
            </>
          ) : (
            <button
              type="button"
              className="button"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          )}

          {userData.role === "artist" && (
            <div>
              <button
                onClick={handleUploadArtworkClick}
                className="button"
                style={{ width: "auto" }}
              >
                Upload Artwork
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Profile_main;
