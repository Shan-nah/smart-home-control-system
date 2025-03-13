import mqtt from "mqtt";

const MQTT_BROKER_URL = "ws://test.mosquitto.org"; // Use your actual MQTT WebSocket URL

const options = {
  clientId: "smart-home-client-" + Math.random().toString(16).substr(2, 8),
  keepalive: 60,
  reconnectPeriod: 1000,
};

const mqttClient = mqtt.connect(MQTT_BROKER_URL, options);

mqttClient.on("connect", () => {
  console.log("✅ Connected to MQTT Broker");

  // Subscribe to all device status topics
  mqttClient.subscribe("smart-home/+/status", (err) => {
    if (err) console.error("Subscription error:", err);
  });
});

export default mqttClient;
