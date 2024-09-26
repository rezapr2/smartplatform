/**
 * @swagger
 * components:
 *   schemas:
 *     Scenario:
 *       type: object
 *       required:
 *         - name
 *         - user
 *       properties:
 *         name:
 *           type: string
 *           description: The scenario name
 *         time:
 *           type: string
 *           description: The scenario time
 *         commands:
 *           type: array
 *           description: The scenario commands
 *         device:
 *           type: string
 *           description: The scenario device
 *         user:
 *           type: string
 *           description: The scenario user
 *         meta:
 *           type: object
 *           description: The scenario meta
 *       example:
 *         name: "Switch 1"
 *         time: "00:00:00"
 *         commands: ["on", "off"]
 *         device: "66202b25e92bc0e46f21cdf9"
 *         user: "66202b25e92bc0e46f21cdf9"
 *         meta: {
 *           status: "on"
 *         }
 */
/**
 * @swagger
 * tags:
 *   name: Scenarios
 *   description: Scenarios management
 */

/**
 * @swagger
 * /api/scenarios/add:
 *   post:
 *     summary: Register a new scenario
 *     tags: [Scenarios]
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
 *             $ref: '#/components/schemas/Scenario'
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Scenario'
 */

/**
 * @swagger
 * /api/scenarios/all:
 *   get:
 *     summary: Get all scenarios by superAdmin
 *     tags: [Scenarios]
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
 *                 $ref: '#/components/schemas/Scenario'
 */

/**
 * @swagger
 * /api/scenarios/all/{userId}:
 *   get:
 *     summary: Get all scenarios for specific user by userId
 *     tags: [Scenarios]
 *     parameters:
 *       - in: header
 *         name: x-auth-token
 *         schema:
 *           type: string
 *         required: true
 *         description: Authentication token for super_admin or user
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Scenario'
 */

/**
 * @swagger
 * /api/scenarios/{scenarioId}:
 *   get:
 *     summary: Get scenario by id by superAdmin or user
 *     tags: [Scenarios]
 *     parameters:
 *       - in: header
 *         name: x-auth-token
 *         schema:
 *           type: string
 *         required: true
 *         description: Authentication token for super_admin
 *       - in: path
 *         name: scenarioId
 *         required: true
 *         schema:
 *           type: string
 *         description: Scenario ID
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Scenario'
 *
 */

/**
 * @swagger
 * /api/scenarios/{scenarioId}:
 *   delete:
 *     summary: Delete scenario by ID by superAdmin
 *     tags: [Scenarios]
 *     parameters:
 *       - in: header
 *         name: x-auth-token
 *         schema:
 *           type: string
 *         required: true
 *         description: Authentication token for super_admin
 *       - in: path
 *         name: scenarioId
 *         required: true
 *         schema:
 *           type: string
 *         description: Scenario ID
 *     responses:
 *       200:
 *         description: Scenario successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: boolean
 *       500:
 *         description: Error occurred while deleting the scenario
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */

/**
 * @swagger
 * /api/scenarios/{scenarioId}:
 *   put:
 *     summary: Update scenario by ID by superAdmin
 *     tags: [Scenarios]
 *     parameters:
 *       - in: header
 *         name: x-auth-token
 *         schema:
 *           type: string
 *         required: true
 *         description: Authentication token for super_admin
 *       - in: path
 *         name: scenarioId
 *         required: true
 *         schema:
 *           type: string
 *         description: Scenario ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Scenario'
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Scenario'
 */

/**
 * @swagger
 * /api/scenarios/meta/{scenarioId}:
 *   put:
 *     summary: Update scenario meta by ID
 *     tags: [Scenarios]
 *     parameters:
 *       - in: header
 *         name: x-auth-token
 *         schema:
 *           type: string
 *         required: true
 *         description: Authentication token for super_admin or scenarios
 *       - in: path
 *         name: scenarioId
 *         required: true
 *         schema:
 *           type: string
 *         description: Scenario ID
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
 *               $ref: '#/components/schemas/Scenario'
 *       500:
 *         description: Error occurred while updating the scenario
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

const scenariosController = require("../controllers/scenariosController");

/* Add New Scenario */
router.post("/add", selfUserOrSuperAdmin, scenariosController.addNewScenario);

/* Get All Scenarios */
router.get("/all", superAdmin, scenariosController.getScenarios);

/* Get All Scenarios for specific user */
router.get(
  "/all/:userId",
  selfUserOrSuperAdmin,
  scenariosController.getScenariosByUser
);

/* get scenario by scenarioId */
router.get("/:scenarioId", selfUserOrSuperAdmin, scenariosController.getScenario);

/* update scenario by scenarioId */
router.put("/:scenarioId", superAdmin, scenariosController.updateScenario);

/* update scenario by scenarioId */
router.put("/meta/:scenarioId", superAdmin, scenariosController.updateScenarioMeta);


/* delete scenario by scenarioId */
router.delete(
  "/:scenarioId",
  selfUserOrSuperAdmin,
  scenariosController.deleteScenario
);

module.exports = router;
