/**
 * @swagger
 * components:
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       required:
 *         - number
 *         - password
 *       properties:
 *         number:
 *           type: string
 *           description: Phonenumber of the user
 *         password:
 *           type: string
 *           description: The user password
 *       example:
 *         number: "09380904517"
 *         password: "123456789"
 *     LoginResponse:
 *       type: object
 *       example:
 *         id: "66202b25e92bc0e46f21cdf9"
 *         name: "Reza Rajabi"
 *         number: "09380904517"
 *         role: "customer"
 *         token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjIwMmIyNWU5MmJjMGU0NmYyMWNkZj"
 */
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User Authentication
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User Authentication
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LoginResponse'
 */

const bcrypt = require("bcrypt");
const Joi = require("joi");
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();

/* Login */

router.post("/login", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ number: req.body.number });
  if (!user)
    return res
      .status(400)
      .send("number or password is wrong ! Please try again.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res
      .status(400)
      .send("number or password is wrong ! Please try again.1");

  const token = user.generateAuthToken();
  res.send({
    id: user._id,
    name: user.name,
    number: user.number,
    role: user.role,
    token: token,
  });
});

function validate(req) {
  const schema = Joi.object({
    number: Joi.string().min(5).max(25).required(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(req);
}

module.exports = router;
