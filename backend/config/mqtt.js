const mqtt = require("mqtt");

const brokerUrl = "mqtt://test.mosquitto.org"; // Replace with your broker
const client = mqtt.connect(brokerUrl);

// Handle connection
client.on("connect", () => {
  console.log("✅ Connected to MQTT Broker");
  client.subscribe("smart-home/+/control"); // Subscribe to control commands
});

// Handle incoming messages and broadcast status updates
client.on("message", (topic, message) => {
  console.log(`📩 Received message on ${topic}: ${message.toString()}`);

  // Extract device ID from topic
  const match = topic.match(/smart-home\/(.+)\/control/);
  if (match) {
    const deviceId = match[1];
    const statusTopic = `smart-home/${deviceId}/status`;

    // Publish new status
    client.publish(statusTopic, message.toString());
  }
});

module.exports = client;
