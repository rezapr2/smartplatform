require('dotenv').config()

const mqtt = require('mqtt');

const options = {
    connectTimeout: 4000,
    clientId: 'API_SERVICE'
}
// Connect to MQTT broker
const mqttClient = mqtt.connect(process.env.mqttUrl, options);

mqttClient.on('connect', () => {
  console.log('Connected to MQTT broker');
});

// Handle incoming MQTT messages
mqttClient.on('message', (topic, message) => {
  // Handle the received message as needed
  console.log('Received message:', message.toString());
});

// Function to send a message to a specific device and receive a response
function sendMessageToDevice(deviceId, message, callback) {
  const responseTopic = `devices/response/${deviceId}`;
  let receivedResponse = false;

  // Subscribe to the response topic for the specific device
  mqttClient.subscribe(responseTopic);

  // Set up a callback to handle the response message
  mqttClient.on('message', (topic, receivedMessage) => {
    console.log('Received response:', receivedMessage.toString());

    // Check if the received message matches the response topic
    if (topic === responseTopic) {
      // Unsubscribe from the response topic
      mqttClient.unsubscribe(responseTopic);

      // Set the receivedResponse flag to true
      receivedResponse = true;

      // Invoke the callback with the response message
      callback(receivedMessage.toString());
    }
  });

  // Publish the message to the device-specific topic
  const deviceTopic = `devices/request/${deviceId}`;
  mqttClient.publish(deviceTopic, message);

  // Set a timeout of 60 seconds
  setTimeout(() => {
    if (!receivedResponse) {
      // No response received within the timeout period
      mqttClient.unsubscribe(responseTopic);
      callback('Timeout: No response received');
    }
  }, 40000);

}

module.exports = {
  sendMessageToDevice
};
