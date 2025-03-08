// import { io } from "socket.io-client";


// const socket = io("http://localhost:4000"); // Backend URL
// io.on("connection", (socket) => {
//   console.log("New client connected: ", socket.id);

//   socket.on("joinRoom", (userId) => {
//     socket.join(userId);
//     console.log(`User ${userId} joined their personal room`);
//   });

//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//   });
// });


// export default socket;
import { io } from "socket.io-client";

const socket = io("http://localhost:4000"); // Connect to backend

socket.on("connect", () => {
  console.log("Connected to server with socket ID:", socket.id);
});

export default socket;

