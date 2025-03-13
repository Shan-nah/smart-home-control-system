const mqttClient = require("../config/mqtt");

const controlDevice = (req, res) => {
  const { deviceId, command } = req.body;

  const controlTopic = `smart-home/${deviceId}/control`;
  const statusTopic = `smart-home/${deviceId}/status`;

  mqttClient.publish(controlTopic, command, (err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to send command" });
    }

    // Simulate a status update (Ideally, the device should report back its status)
    setTimeout(() => {
      mqttClient.publish(statusTopic, command);
    }, 1000);

    res.status(200).json({ message: `Command '${command}' sent to device ${deviceId}` });
  });
};

module.exports = { controlDevice };
