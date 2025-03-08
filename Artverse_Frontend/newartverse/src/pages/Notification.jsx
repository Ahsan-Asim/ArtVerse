// // import React, { useState, useEffect } from "react";

// // const Notifications = () => {
// //   const [notifications, setNotifications] = useState([]);

// //   useEffect(() => {
// //     fetch("http://localhost:4000/api/requests/all")
// //       .then((response) => response.json())
// //       .then((data) => {
// //         if (data.success) {
// //           setNotifications(data.notifications); // Correct field name
// //         }
// //       })
// //       .catch((error) => console.error("Error fetching notifications:", error));
// //   }, []);

// //   return (
// //     <div>
// //       <h2>Notifications</h2>
// //       {notifications.length === 0 ? (
// //         <p>No new notifications</p>
// //       ) : (
// //         <ul>
// //           {notifications.map((notification, index) => (
// //             <li key={index}>
// //               <strong>{notification.serviceId}</strong> - {notification.description} (Budget: {notification.budget}, Time: {notification.time} days)
// //             </li>
// //           ))}
// //         </ul>
// //       )}
// //     </div>
// //   );
// // };

// // export default Notifications;



// // // import React, { useState, useEffect } from "react";
// // // import { Link } from "react-router-dom";
// // // import { IoHomeOutline, IoNotificationsOutline } from "react-icons/io5";
// // // import io from "socket.io-client";

// // // const socket = io("http://localhost:4000"); // Update with your backend URL

// // // const Notification = ({ userId }) => {
// // //   const [notifications, setNotifications] = useState([]);
// // //   const [showDropdown, setShowDropdown] = useState(false);

// // //   useEffect(() => {
// // //     if (userId) {
// // //       socket.emit("joinRoom", userId);
// // //       console.log(`Joining room: ${userId}`); // Add this log
// // //     }
  
// // //     socket.on("newRequest", (notif) => {
// // //       console.log("New notification received:", notif); // Check if this logs anything
// // //       setNotifications((prev) => [...prev, notif]);
// // //     });
  
// // //     return () => {
// // //       socket.off("newRequest");
// // //     };
// // //   }, [userId]);

// // //   const handleNotificationClick = () => {
// // //     setShowDropdown(!showDropdown);
// // //   };

// // //   const handleClearNotifications = () => {
// // //     setNotifications([]);
// // //     setShowDropdown(false);
// // //   };

// // //   return (
// // //     <div className="flex justify-center items-center h-screen bg-gray-100">
// // //       <div className="relative flex gap-6">
// // //         {/* Home Button */}
// // //         <Link to="/home" className="relative">
// // //           <IoHomeOutline size={50} className="text-blue-600" />
// // //         </Link>

// // //         {/* Notification Icon */}
// // //         <div className="relative">
// // //           <button onClick={handleNotificationClick} className="relative">
// // //             <IoNotificationsOutline size={50} className="text-blue-600" />
// // //             {notifications.length > 0 && (
// // //               <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
// // //                 {notifications.length}
// // //               </span>
// // //             )}
// // //           </button>

// // //           {/* Notification Dropdown */}
// // //           {showDropdown && (
// // //             <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4">
// // //               <h3 className="text-lg font-semibold">Notifications</h3>
// // //               <ul className="mt-2 max-h-40 overflow-y-auto">
// // //                 {notifications.length > 0 ? (
// // //                   notifications.map((notif, index) => (
// // //                     <li key={index} className="p-2 border-b">
// // //                       {notif.message}
// // //                     </li>
// // //                   ))
// // //                 ) : (
// // //                   <li className="p-2 text-gray-500">No new notifications</li>
// // //                 )}
// // //               </ul>
// // //               {notifications.length > 0 && (
// // //                 <button
// // //                   onClick={handleClearNotifications}
// // //                   className="mt-2 w-full bg-red-500 text-white py-1 rounded"
// // //                 >
// // //                   Clear All
// // //                 </button>
// // //               )}
// // //             </div>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Notification;

// import { useEffect, useState } from "react";
// import socket from "../socket"; // Import socket instance

// const NotificationBar = () => {
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     // Fetch all notifications
//     fetch("http://localhost:4000/api/notifications")
//       .then(response => response.json())
//       .then(data => {
//         if (data.success) {
//           setNotifications(data.notifications);
//         }
//       })
//       .catch(error => console.error("Error fetching notifications:", error));

//     // Listen for real-time notifications
//     socket.on("new-request", (data) => {
//       setNotifications(prev => [data, ...prev]); // Prepend new notification
//     });

//     return () => socket.off("new-request"); // Cleanup listener
//   }, []);

//   return (
//     <div className="notification-bar">
//       <h2>Notifications</h2>
//       {notifications.length === 0 ? (
//         <p>No new notifications</p>
//       ) : (
//         <ul>
//           {notifications.map((notification, index) => (
//             <li key={index} className="notification-item">
//               {notification.message}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default NotificationBar;


// import { useEffect, useState } from "react";
// import socket from "../socket";

// const NotificationBar = () => {
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     fetch("/api/auth/me") // Get the logged-in artist's data
//       .then(res => res.json())
//       .then(data => {
//         if (data.success) {
//           socket.emit("artist-login", data.artist._id); // ✅ Notify server artist is online
//         }
//       });

//     // Fetch notifications
//     fetch("/api/notifications")
//       .then(res => res.json())
//       .then(data => {
//         if (data.success) {
//           setNotifications(data.notifications);
//         }
//       });

//     // Listen for real-time notifications
//     socket.on("new-request", (data) => {
//       setNotifications(prev => [data, ...prev]);
//     });

//     return () => socket.off("new-request"); // Cleanup
//   }, []);

//   return (
//     <div className="notification-bar">
//       <h2>Notifications</h2>
//       {notifications.length === 0 ? (
//         <p>No new notifications</p>
//       ) : (
//         <ul>
//           {notifications.map((notification, index) => (
//             <li key={index} className="notification-item">
//               {notification.message}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default NotificationBar;

import { useEffect, useState } from "react";
import socket from "../socket";

const NotificationBar = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("token"); // Retrieve JWT token from localStorage

    // ✅ Fetch logged-in artist details
    fetch("http://localhost:4000/api/notifications/auth/me", {
      headers: { Authorization: `Bearer ${token}` }, // Send token for authentication
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          socket.emit("artist-login", data.artist._id); // ✅ Notify server artist is online
        }
      })
      .catch(error => console.error("Error fetching artist:", error));

    // ✅ Fetch artist notifications
    fetch("http://localhost:4000/api/notifications", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setNotifications(data.notifications);
        }
      })
      .catch(error => console.error("Error fetching notifications:", error));

    // ✅ Listen for real-time notifications
    socket.on("new-request", (data) => {
      setNotifications(prev => [data, ...prev]);
    });

    return () => socket.off("new-request"); // Cleanup
  }, []);

  return (
    <div className="notification-bar">
      <h2>Notifications</h2>
      {notifications.length === 0 ? (
        <p>No new notifications</p>
      ) : (
        <ul>
          {notifications.map((notification, index) => (
            <li key={index} className="notification-item">
              {notification.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationBar;

