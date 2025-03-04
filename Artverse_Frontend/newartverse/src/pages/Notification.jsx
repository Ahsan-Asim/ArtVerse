import React, { useState, useEffect } from 'react';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/artist/notifications')
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setNotifications(data.notifications); // Store notifications in state
        }
      })
      .catch(error => console.error("Error fetching notifications:", error));
  }, []);

  return (
    <div>
      <h2>Notifications</h2>
      {notifications.length === 0 ? (
        <p>No new notifications</p>
      ) : (
        <ul>
          {notifications.map((notification, index) => (
            <li key={index}>
              <strong>{notification.name}</strong> ({notification.email}) - {notification.notification}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
