import React, { useState, useEffect } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import socket from "./socketClient"; // Import WebSocket client

function App() {
  const [lightStatus, setLightStatus] = useState("OFF");

  useEffect(() => {
    // Listen for MQTT data via WebSocket
    socket.on("mqttData", ({ topic, message }) => {
      console.log(`📩 WebSocket Message Received on ${topic}: ${message}`);
      if (topic === "smart-home/light/control") {
        setLightStatus(message); // Update light status
      }
    });

    return () => {
      socket.off("mqttData");
    };
  }, []);

  const toggleLight = (state) => {
    fetch("http://localhost:5001/api/devices/control", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        deviceId: "light",
        command: state ? "ON" : "OFF",
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Smart Home Control System
      </Typography>
      <Typography variant="h6">Light Status: {lightStatus}</Typography>
      <Box>
        <Button
          variant="contained"
          color="primary"
          sx={{ m: 1 }}
          onClick={() => toggleLight(true)}
        >
          Turn On Lights
        </Button>
        <Button
          variant="contained"
          color="secondary"
          sx={{ m: 1 }}
          onClick={() => toggleLight(false)}
        >
          Turn Off Lights
        </Button>
      </Box>
    </Container>
  );
}

export default App;
