/**
 * @swagger
 * components:
 *   schemas:
 *     Partner:
 *       type: object
 *       required:
 *         - name
 *         - number
 *       properties:
 *         name:
 *           type: string
 *           description: The partner name
 *         number:
 *           type: string
 *           description: Phonenumber of the partner
 *         status:
 *           type: string
 *           description: The partner status
 *         meta:
 *           type: object
 *           description: The partner meta
 *       example:
 *         name: "Reza"
 *         number: "09380904517"
 *         status: "active"
 */
/**
 * @swagger
 * tags:
 *   name: Partners
 *   description: Partners management
 */

/**
 * @swagger
 * /api/partners/add:
 *   post:
 *     summary: Register a new partner
 *     tags: [Partners]
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
 *             $ref: '#/components/schemas/Partner'
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Partner'
 */

/**
 * @swagger
 * /api/partners/all:
 *   get:
 *     summary: Get all partners by superAdmin
 *     tags: [Partners]
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
 *                 $ref: '#/components/schemas/Partner'
 */

/**
 * @swagger
 * /api/partners/{partnerId}:
 *   get:
 *     summary: Get partner by id by superAdmin
 *     tags: [Partners]
 *     parameters:
 *       - in: header
 *         name: x-auth-token
 *         schema:
 *           type: string
 *         required: true
 *         description: Authentication token for super_admin
 *       - in: path
 *         name: partnerId
 *         required: true
 *         schema:
 *           type: string
 *         description: Partner ID
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Partner'
 *
 */

/**
 * @swagger
 * /api/partners/{partnerId}:
 *   delete:
 *     summary: Delete partner by ID by superAdmin
 *     tags: [Partners]
 *     parameters:
 *       - in: header
 *         name: x-auth-token
 *         schema:
 *           type: string
 *         required: true
 *         description: Authentication token for super_admin
 *       - in: path
 *         name: partnerId
 *         required: true
 *         schema:
 *           type: string
 *         description: Partner ID
 *     responses:
 *       200:
 *         description: Partner successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: boolean
 *       500:
 *         description: Error occurred while deleting the partner
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */

/**
 * @swagger
 * /api/partners/{partnerId}:
 *   put:
 *     summary: Update partner by ID by superAdmin
 *     tags: [Partners]
 *     parameters:
 *       - in: header
 *         name: x-auth-token
 *         schema:
 *           type: string
 *         required: true
 *         description: Authentication token for super_admin
 *       - in: path
 *         name: partnerId
 *         required: true
 *         schema:
 *           type: string
 *         description: Partner ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Partner'
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Partner'
 */

/**
 * @swagger
 * /api/partners/meta/{partnerId}:
 *   put:
 *     summary: Update partner meta by ID
 *     tags: [Partners]
 *     parameters:
 *       - in: header
 *         name: x-auth-token
 *         schema:
 *           type: string
 *         required: true
 *         description: Authentication token for super_admin or partners
 *       - in: path
 *         name: partnerId
 *         required: true
 *         schema:
 *           type: string
 *         description: Partner ID
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
 *               $ref: '#/components/schemas/Partner'
 *       500:
 *         description: Error occurred while updating the partner
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *
 */

const express = require("express");
const router = express.Router();
const superAdmin = require("../middleware/superAdmin");

const partnersController = require("../controllers/partnersController");

/* Create New Partner */
router.post("/add", superAdmin, partnersController.addNewPartner);

/* Get All Partners */
router.get("/all", superAdmin, partnersController.getPartners);

/* get partner by partnerId */
router.get("/:partnerId", superAdmin, partnersController.getPartner);

/* update partner by partnerId */
router.put("/:partnerId", superAdmin, partnersController.updatePartner);

/* update partner by partnerId */
router.put("/meta/:partnerId", superAdmin, partnersController.updatePartnerMeta);

/* delete partner by partnerId */
router.delete("/:partnerId", superAdmin, partnersController.deletePartner);

module.exports = router;
