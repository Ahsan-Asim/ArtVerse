// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import io from "socket.io-client";
// import Logo from "../assets/images/ArtVerse_Logo.png";
// import ShoppingIcon from "../assets/images/shopping.png";
// import LikeIcon from "../assets/images/heart.png";
// import DefaultProfileIcon from "../assets/images/default_profile.jpeg";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBell } from "@fortawesome/free-solid-svg-icons";
// import "../styles/HomePage/Home_Page_Navigation.css";

// // Initialize Socket.io connection
// const socket = io("http://localhost:4000");

// export const NavigationBar = () => {
//   const [profileImage, setProfileImage] = useState(DefaultProfileIcon);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [notifications, setNotifications] = useState([]);
//   const [notificationCount, setNotificationCount] = useState(0);
//   const [showNotifications, setShowNotifications] = useState(false);

//   const navigate = useNavigate();
//   const role = sessionStorage.getItem("role");
//   const token = sessionStorage.getItem("token");

//   useEffect(() => {
//     if (token) {
//       let apiUrl = "";
//       if (role === "artist") {
//         // Fetch artist profile
//         apiUrl = "http://localhost:4000/api/artists/me";
//       } else if (role === "user") {
//         // Fetch user profile
//         apiUrl = "http://localhost:4000/api/users/me";
//       }

//       fetch(apiUrl, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           if (data.success) {
//             setProfileImage(data.profileImage || DefaultProfileIcon);
//             socket.emit("user-login", data._id); // Emit login event based on user type
//           }
//         })
//         .catch((err) => console.error("Error fetching profile data:", err));

//       // Fetch notifications
//       let notificationApi = "";
//       if (role === "artist") {
//         notificationApi = "http://localhost:4000/api/notifications/artist-not";
//       } else if (role === "user") {
//         notificationApi = "http://localhost:4000/api/notifications/user-not";
//       }

//       fetch(notificationApi, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           if (data.success) {
//             setNotifications(data.notifications);
//             setNotificationCount(data.notifications.filter((n) => !n.isRead).length);
//           }
//         })
//         .catch((err) => console.error("Error fetching notifications:", err));

//       // Listen for real-time notifications
//       socket.on("new-notification", (data) => {
//         setNotifications((prev) => [data, ...prev]);
//         setNotificationCount((prev) => prev + 1);
//       });
//     }

//     return () => socket.off("new-notification");
//   }, [token, role]);

//   const toggleNotifications = () => {
//     setShowNotifications(!showNotifications);
//     if (notificationCount > 0) {
//       setNotificationCount(0);
//       fetch("http://localhost:4000/api/notifications/mark-read", {
//         method: "POST",
//         headers: { Authorization: `Bearer ${token}` },
//       }).catch((err) => console.error("Error marking notifications as read:", err));
//     }
//   };

//   return (
//     <nav className="navbar navbar-default navbar-fixed-top">
//       <div className="wrapper">
//         <div className="nav-header">
//           <button className={`nav-toggle ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
//             <div className="bar"></div>
//             <div className="bar"></div>
//             <div className="bar"></div>
//           </button>

//           <Link to="/" className="brand-logo">
//             <img src={Logo} alt="ArtVerse Logo" className="brand-image" />
//           </Link>

//           <div className="nav-icons">
//             <Link to="/favorites">
//               <img src={LikeIcon} alt="Like Icon" className="icon like-icon" />
//             </Link>
//             <Link to="/cart">
//               <img src={ShoppingIcon} alt="Shopping Icon" className="icon cart-icon" />
//             </Link>

//             <div className="notification-wrapper">
//               <FontAwesomeIcon icon={faBell} className="icon notification-icon" onClick={toggleNotifications} />
//               {notificationCount > 0 && <span className="notification-badge">{notificationCount}</span>}
//               {showNotifications && (
//                 <div className="notification-dropdown">
//                   <h4>Notifications</h4>
//                   {notifications.length === 0 ? (
//                     <p>No new notifications</p>
//                   ) : (
//                     <ul>
//                       {notifications.map((notification, index) => (
//                         <li key={index} className="notification-item">
//                           <Link to={`/request-details/${notification._id}`}>{notification.message}</Link>
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                 </div>
//               )}
//             </div>

//             <Link to="/profile">
//               <img src={profileImage} alt="Profile Icon" className="icon profile-icon" />
//             </Link>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };


import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import Logo from "../assets/images/ArtVerse_Logo.png";
import ShoppingIcon from "../assets/images/shopping.png";
import LikeIcon from "../assets/images/heart.png";
import DefaultProfileIcon from "../assets/images/default_profile.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import "../styles/HomePage/Home_Page_Navigation.css";

// Initialize Socket.io connection
const socket = io("http://localhost:4000");

export const NavigationBar = () => {
  const [profileImage, setProfileImage] = useState(DefaultProfileIcon);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);

  const navigate = useNavigate();
  const role = sessionStorage.getItem("role");
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (token) {
      let apiUrl = role === "artist" 
        ? "http://localhost:4000/api/artists/me" 
        : "http://localhost:4000/api/users/me";

      fetch(apiUrl, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setProfileImage(data.profileImage || DefaultProfileIcon);
            socket.emit("user-login", data._id);
          }
        })
        .catch((err) => console.error("Error fetching profile data:", err));

      let notificationApi = role === "artist" 
        ? "http://localhost:4000/api/notifications/artist-not" 
        : "http://localhost:4000/api/notifications/user-not";

      fetch(notificationApi, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setNotifications(data.notifications);
            setNotificationCount(data.notifications.filter((n) => !n.isRead).length);
          }
        })
        .catch((err) => console.error("Error fetching notifications:", err));

      socket.on("new-notification", (data) => {
        setNotifications((prev) => [data, ...prev]);
        setNotificationCount((prev) => prev + 1);
      });
    }

    return () => socket.off("new-notification");
  }, [token, role]);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (notificationCount > 0) {
      setNotificationCount(0);
      fetch("http://localhost:4000/api/notifications/mark-read", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }).catch((err) => console.error("Error marking notifications as read:", err));
    }
  };

  return (
    <nav className="navbar navbar-default navbar-fixed-top">
      <div className="wrapper">
        <div className="nav-header">
          <button className={`nav-toggle ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </button>

          <Link to="/" className="brand-logo">
            <img src={Logo} alt="ArtVerse Logo" className="brand-image" />
          </Link>
          {/* Icons Section (Like, Cart & Profile) */}
        <div className="nav-icons">
          <Link to="/favorites">
            <img src={LikeIcon} alt="Like Icon" className="icon like-icon" />
          </Link>
          <Link to="/cart">
            <img src={ShoppingIcon} alt="Shopping Icon" className="icon cart-icon" />
          </Link>

            <div className="notification-wrapper">
              <FontAwesomeIcon
                icon={faBell}
                className="icon notification-icon"
                onClick={() => {
                  if (role === "user") {
                    navigate("/Commission");
                  } else {
                    toggleNotifications();
                  }
                }}
              />
              {notificationCount > 0 && <span className="notification-badge">{notificationCount}</span>}
              
              {showNotifications && role !== "user" && (
                <div className="notification-dropdown">
                  <h4>Notifications</h4>
                  {notifications.length === 0 ? (
                    <p>No new notifications</p>
                  ) : (
                    <ul>
                      {notifications.map((notification, index) => (
                        <li key={index} className="notification-item">
                          <Link to={`/request-details/${notification._id}`}>{notification.message}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>

            <Link to="/profile">
              <img src={profileImage} alt="Profile Icon" className="icon profile-icon" />
            </Link>
        </div>
        </div>

        {/* Navigation Menu */}
        <div className={`nav-collapse ${menuOpen ? "open" : ""}`}>
          <ul className="nav-list">
            <li>
              <Link to="/become-artist" className="nav-item">
                Become Artist
              </Link>
            </li>
            <li>
              <Link to="/about" className="nav-item">
                Why Us
              </Link>
            </li>
            <li>
              <Link to="/paintings" className="nav-item">
                Paintings
              </Link>
            </li>
            <li>
              <Link to="/sculptures" className="nav-item">
                Sculptures
              </Link>
            </li>
            <li>
              <Link to="/photography" className="nav-item">
                Photography
              </Link>
            </li>
          </ul>
          </div>

        {/* Navigation Menu */}
        <div className={`nav-collapse ${menuOpen ? "open" : ""}`}>
          <ul className="nav-list">
            <li>
              <Link to="/become-artist" className="nav-item">
                Become Artist
              </Link>
            </li>
            <li>
              <Link to="/about" className="nav-item">
                Why Us
              </Link>
            </li>
            <li>
              <Link to="/paintings" className="nav-item">
                Paintings
              </Link>
            </li>
            <li>
              <Link to="/sculptures" className="nav-item">
                Sculptures
              </Link>
            </li>
            <li>
              <Link to="/photography" className="nav-item">
                Photography
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
