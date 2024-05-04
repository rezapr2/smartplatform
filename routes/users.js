/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - number
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: The user name
 *         number:
 *           type: string
 *           description: Phonenumber of the user
 *         password:
 *           type: string
 *           description: Phonenumber of the user
 *         partner:
 *           type: string
 *           description: The user partner
 *         meta:
 *           type: object
 *           description: The user meta
 *       example:
 *         name: "Reza Rajabi"
 *         number: "09380904517"
 *         password: "123456789"
 *     UserResponse:
 *       type: object
 *       example:
 *         id: "66202b25e92bc0e46f21cdf9"
 *         name: "Reza Rajabi"
 *         status: "active"
 *         role: "customer"
 *         number: "09380904517"
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Users management
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Add a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /api/users/all:
 *   get:
 *     summary: Get all users by superAdmin
 *     tags: [Users]
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
 *                 $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /api/users/{userId}:
 *   get:
 *     summary: Get user by id
 *     tags: [Users]
 *     parameters:
 *       - in: header
 *         name: x-auth-token
 *         schema:
 *           type: string
 *         required: true
 *         description: Authentication token for super_admin or users
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
 *               $ref: '#/components/schemas/UserResponse'
 *
 */

/**
 * @swagger
 * /api/users/{userId}:
 *   delete:
 *     summary: Delete user by ID by superAdmin
 *     tags: [Users]
 *     parameters:
 *       - in: header
 *         name: x-auth-token
 *         schema:
 *           type: string
 *         required: true
 *         description: Authentication token for super_admin
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: boolean
 *       500:
 *         description: Error occurred while deleting the user
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */

/**
 * @swagger
 * /api/users/{userId}:
 *   put:
 *     summary: Update user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: header
 *         name: x-auth-token
 *         schema:
 *           type: string
 *         required: true
 *         description: Authentication token for super_admin or users
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 */

/**
 * @swagger
 * /api/users/meta/{userId}:
 *   put:
 *     summary: Update user meta by ID
 *     tags: [Users]
 *     parameters:
 *       - in: header
 *         name: x-auth-token
 *         schema:
 *           type: string
 *         required: true
 *         description: Authentication token for super_admin or users
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
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
 *               $ref: '#/components/schemas/UserResponse'
 *       500:
 *         description: Error occurred while updating the user
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

const usersController = require("../controllers/usersController");

/* Create New User */

router.post("/register", usersController.addNewUser);

/* Get All Users */

router.get("/all", superAdmin, usersController.getUsers);

/* get user by userId */

router.get(
  "/:userId",
  selfUserOrSuperAdmin,
  usersController.getUser
);

/* update user by userId */

router.put(
  "/:userId",
  selfUserOrSuperAdmin,
  usersController.updateUser
);

/* update user meta by userId */

router.put(
  "/meta/:userId",
  selfUserOrSuperAdmin,
  usersController.updateUserMeta
);

/* delete user by userId */
router.delete(
  "/:userId",
  superAdmin,
  usersController.deleteUser
);

module.exports = router;
