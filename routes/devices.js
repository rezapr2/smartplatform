/**
 * @swagger
 * components:
 *   schemas:
 *     Device:
 *       type: object
 *       required:
 *         - name
 *         - number
 *       properties:
 *         name:
 *           type: string
 *           description: The device name
 *         number:
 *           type: string
 *           description: Phonenumber of the device
 *         status:
 *           type: string
 *           description: The device status
 *         meta:
 *           type: object
 *           description: The device meta
 *       example:
 *         name: "Reza"
 *         number: "09380904517"
 *         status: "active"
 */
/**
 * @swagger
 * tags:
 *   name: Devices
 *   description: Devices management
 */

/**
 * @swagger
 * /api/devices/add:
 *   post:
 *     summary: Register a new device
 *     tags: [Devices]
 *     parameters:
 *       - in: header
 *         name: x-auth-token
 *         schema:
 *           type: string
 *         required: true
 *         description: Authentication token for super_admin or user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Device'
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Device'
 */


/**
 * @swagger
 * /api/devices/all:
 *   get:
 *     summary: Get all devices by superAdmin
 *     tags: [Devices]
 *     parameters:
 *       - in: header
 *         name: x-auth-token
 *         schema:
 *           type: string
 *         required: true
 *         description: Authentication token for super_admin
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Device'
 */

/**
 * @swagger
 * /api/devices/all/{userId}:
 *   get:
 *     summary: Get all devices for specific user by userId
 *     tags: [Devices]
 *     parameters:
 *       - in: header
 *         name: x-auth-token
 *         schema:
 *           type: string
 *         required: true
 *         description: Authentication token for super_admin or user
 *       - in: path
 *         name: deviceId
 *         required: true
 *         schema:
 *           type: string
 *         description: Device ID
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Device'
 */

/**
 * @swagger
 * /api/devices/{deviceId}:
 *   get:
 *     summary: Get device by id by superAdmin or user
 *     tags: [Devices]
 *     parameters:
 *       - in: header
 *         name: x-auth-token
 *         schema:
 *           type: string
 *         required: true
 *         description: Authentication token for super_admin
 *       - in: path
 *         name: deviceId
 *         required: true
 *         schema:
 *           type: string
 *         description: Device ID
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Device'
 *
 */

/**
 * @swagger
 * /api/devices/{deviceId}:
 *   delete:
 *     summary: Delete device by ID by superAdmin
 *     tags: [Devices]
 *     parameters:
 *       - in: header
 *         name: x-auth-token
 *         schema:
 *           type: string
 *         required: true
 *         description: Authentication token for super_admin
 *       - in: path
 *         name: deviceId
 *         required: true
 *         schema:
 *           type: string
 *         description: Device ID
 *     responses:
 *       200:
 *         description: Device successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: boolean
 *       500:
 *         description: Error occurred while deleting the device
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */

/**
 * @swagger
 * /api/devices/{deviceId}:
 *   put:
 *     summary: Update device by ID by superAdmin
 *     tags: [Devices]
 *     parameters:
 *       - in: header
 *         name: x-auth-token
 *         schema:
 *           type: string
 *         required: true
 *         description: Authentication token for super_admin
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
 *             $ref: '#/components/schemas/Device'
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Device'
 */

/**
 * @swagger
 * /api/devices/meta/{deviceId}:
 *   put:
 *     summary: Update device meta by ID
 *     tags: [Devices]
 *     parameters:
 *       - in: header
 *         name: x-auth-token
 *         schema:
 *           type: string
 *         required: true
 *         description: Authentication token for super_admin or devices
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
 *             type: object
 *             properties:
 *               key:
 *                 type: string
 *               value:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Device'
 *       500:
 *         description: Error occurred while updating the device
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *
 */

const express = require("express");
const router = express.Router();
const superAdmin = require("../middleware/superAdmin");
const selfUserOrSuperAdmin = require("../middleware/selfUserOrSuperAdmin");

const devicesController = require("../controllers/devicesController");

/* Add New Device */
router.post("/add", selfUserOrSuperAdmin, devicesController.addNewDevice);

/* Get All Devices */
router.get("/all", superAdmin, devicesController.getDevices);

/* Get All Devices for specific user */
router.get("/all/:userId", selfUserOrSuperAdmin, devicesController.getDevicesByUser);

/* get device by deviceId */
router.get("/:deviceId", selfUserOrSuperAdmin, devicesController.getDevice);

/* update device by deviceId */
router.put("/:deviceId", superAdmin, devicesController.updateDevice);

/* update device by deviceId */
router.put("/meta/:deviceId", superAdmin, devicesController.updateDeviceMeta);

/* delete device by deviceId */
router.delete("/:deviceId", selfUserOrSuperAdmin, devicesController.deleteDevice);

module.exports = router;
