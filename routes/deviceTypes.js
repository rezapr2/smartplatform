/**
 * @swagger
 * components:
 *   schemas:
 *     DeviceType:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: The deviceType name
 *         meta:
 *           type: object
 *           description: The deviceType meta
 *       example:
 *         name: "4 gang switche"
 */
/**
 * @swagger
 * tags:
 *   name: DeviceTypes
 *   description: DeviceTypes management
 */

/**
 * @swagger
 * /api/devicestypes/add:
 *   post:
 *     summary: Register a new deviceType by suoperAdmin
 *     tags: [DeviceTypes]
 *     parameters:
 *       - in: header
 *         name: x-auth-token
 *         schema:
 *           type: string
 *         required: true
 *         description: Authentication token for super_admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeviceType'
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DeviceType'
 */

/**
 * @swagger
 * /api/devicestypes/all:
 *   get:
 *     summary: Get all deviceTypes 
 *     tags: [DeviceTypes]
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DeviceType'
 */

/**
 * @swagger
 * /api/devicestypes/{deviceTypeId}:
 *   get:
 *     summary: Get deviceType by id 
 *     tags: [DeviceTypes]
 *     parameters:
 *       - in: path
 *         name: deviceTypeId
 *         required: true
 *         schema:
 *           type: string
 *         description: DeviceType ID
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeviceType'
 *
 */

/**
 * @swagger
 * /api/devicestypes/{deviceTypeId}:
 *   delete:
 *     summary: Delete deviceType by ID by superAdmin
 *     tags: [DeviceTypes]
 *     parameters:
 *       - in: header
 *         name: x-auth-token
 *         schema:
 *           type: string
 *         required: true
 *         description: Authentication token for super_admin
 *       - in: path
 *         name: deviceTypeId
 *         required: true
 *         schema:
 *           type: string
 *         description: DeviceType ID
 *     responses:
 *       200:
 *         description: DeviceType successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: boolean
 *       500:
 *         description: Error occurred while deleting the deviceType
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */

/**
 * @swagger
 * /api/devicestypes/{deviceTypeId}:
 *   put:
 *     summary: Update deviceType by ID by superAdmin
 *     tags: [DeviceTypes]
 *     parameters:
 *       - in: header
 *         name: x-auth-token
 *         schema:
 *           type: string
 *         required: true
 *         description: Authentication token for super_admin
 *       - in: path
 *         name: deviceTypeId
 *         required: true
 *         schema:
 *           type: string
 *         description: DeviceType ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeviceType'
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeviceType'
 */

/**
 * @swagger
 * /api/devicestypes/meta/{deviceTypeId}:
 *   put:
 *     summary: Update deviceType meta by ID
 *     tags: [DeviceTypes]
 *     parameters:
 *       - in: header
 *         name: x-auth-token
 *         schema:
 *           type: string
 *         required: true
 *         description: Authentication token for super_admin or deviceTypes
 *       - in: path
 *         name: deviceTypeId
 *         required: true
 *         schema:
 *           type: string
 *         description: DeviceType ID
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
 *               $ref: '#/components/schemas/DeviceType'
 *       500:
 *         description: Error occurred while updating the deviceType
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *
 */

const express = require("express");
const router = express.Router();
const superAdmin = require("../middleware/superAdmin");

const deviceTypesController = require("../controllers/deviceTypesController");

/* Create New DeviceType */
router.post("/add", superAdmin, deviceTypesController.addNewDeviceType);

/* Get All DeviceTypes */
router.get("/all", deviceTypesController.getDeviceTypes);

/* get deviceType by deviceTypeId */
router.get("/:deviceTypeId", deviceTypesController.getDeviceType);

/* update deviceType by deviceTypeId */
router.put("/:deviceTypeId", superAdmin, deviceTypesController.updateDeviceType);

/* update deviceType by deviceTypeId */
router.put("/meta/:deviceTypeId", superAdmin, deviceTypesController.updateDeviceTypeMeta);

/* delete deviceType by deviceTypeId */
router.delete("/:deviceTypeId", superAdmin, deviceTypesController.deleteDeviceType);

module.exports = router;
