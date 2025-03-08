// const { Server } = require("socket.io");
// const onlineArtists = {}; // Track online artists in memory




// let io;

// module.exports = {
//   init: (server) => {
//     io = new Server(server, {
//       cors: {
//         origin: "*",
//         methods: ["GET", "POST"],
//       },
//     });

//     io.on("connection", (socket) => {
//       console.log("New client connected:", socket.id);
    
//       // When an artist logs in, store their socket ID
//       socket.on("artist-login", (artistId) => {
//         onlineArtists[artistId] = socket.id;
//         console.log(`Artist logged in: ${artistId} (Socket: ${socket.id})`);
//       });
    
//       // When an artist disconnects, remove them from tracking
//       socket.on("disconnect", () => {
//         const artistId = Object.keys(onlineArtists).find((id) => onlineArtists[id] === socket.id);
//         if (artistId) {
//           delete onlineArtists[artistId];
//           console.log(`Artist disconnected: ${artistId}`);
//         }
//       });
//     });
    

//     return io;
//   },
//   getIO: () => {
//     if (!io) {
//       throw new Error("Socket.io not initialized!");
//     }
//     return io;
//   },
// };


const { Server } = require("socket.io");
const onlineArtists = {}; // Track online artists
const onlineUsers = {}; // Track online users

let io;

module.exports = {
  init: (server) => {
    io = new Server(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    io.on("connection", (socket) => {
      console.log("New client connected:", socket.id);

      // Store artist's socket ID
      socket.on("artist-login", (artistId) => {
        onlineArtists[artistId] = socket.id;
        console.log(`Artist logged in: ${artistId} (Socket: ${socket.id})`);
      });

      // Store user's socket ID
      socket.on("user-login", (userId) => {
        onlineUsers[userId] = socket.id;
        console.log(`User logged in: ${userId} (Socket: ${socket.id})`);
      });

      // Handle disconnect
      socket.on("disconnect", () => {
        const artistId = Object.keys(onlineArtists).find((id) => onlineArtists[id] === socket.id);
        if (artistId) {
          delete onlineArtists[artistId];
          console.log(`Artist disconnected: ${artistId}`);
        }

        const userId = Object.keys(onlineUsers).find((id) => onlineUsers[id] === socket.id);
        if (userId) {
          delete onlineUsers[userId];
          console.log(`User disconnected: ${userId}`);
        }
      });
    });

    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error("Socket.io not initialized!");
    }
    return io;
  },
};
