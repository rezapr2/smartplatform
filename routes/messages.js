/**
 * @swagger
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       required:
 *         - message
 *       properties:
 *         message:
 *           type: string
 *           description: The message
 *       example:
 *         message: "on"
 */
/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: Messages management
 */

/**
 * @swagger
 * /api/messages/devices/{deviceId}:
 *   post:
 *     summary: send a message to device
 *     tags: [Messages]
 *     parameters:
 *       - in: header
 *         name: x-auth-token
 *         schema:
 *           type: string
 *         required: true
 *         description: Authentication token for superAdmin or ownerUser
 *       - in: path
 *         name: deviceId
 *         required: true
 *         schema:
 *           type: string
 *         description: Device ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Message'
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 */


const express = require("express");
const router = express.Router();
const selfDeviceOrSuperAdmin = require("../middleware/selfDeviceOrSuperAdmin");

const mqttService = require("../services/mqttService");

// Endpoint to send a message to a specific device and receive a response
router.post('/devices/:deviceId', selfDeviceOrSuperAdmin, (req, res) => {
    const { deviceId } = req.params;
    const { message } = req.body;
  
    // Call the sendMessageToDevice function from the mqttController module
    mqttService.sendMessageToDevice(deviceId, message, (response) => {
      console.log('Response received:', response);
      res.status(200).send(response);
    });
});

module.exports = router;
