require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const mqttClient = require("./config/mqtt");
const { auth } = require("./config/firebase");
const pool = require("./config/db");

// Import Routes
const authRoutes = require("./routes/auth");
const deviceRoutes = require("./routes/devices");

// Initialize Express & HTTP Server
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/devices", deviceRoutes);

app.get("/", (req, res) => {
  res.send("Smart Home Backend is Running 🚀");
});

// Socket.io Connection
io.on("connection", (socket) => {
  console.log("⚡ New client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

// MQTT Event Handling
mqttClient.on("message", (topic, message) => {
  console.log(`📡 MQTT Message Received: ${topic} -> ${message.toString()}`);
  io.emit("mqttData", { topic, message: message.toString() }); // Send data to frontend
});

// Server Setup
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
