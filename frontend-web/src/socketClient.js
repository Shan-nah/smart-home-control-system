import { io } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:5001"; // Ensure this matches your backend URL

const socket = io(SOCKET_SERVER_URL);

socket.on("connect", () => {
  console.log("✅ Connected to WebSocket Server");
});

export default socket;
