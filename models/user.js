require('dotenv').config()
const jwt = require("jsonwebtoken");
const Joi = require('joi');
const mongoose = require('mongoose');
const { Partner } = require('./partner');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    status: {
        type: String,
        required: true,
        trim: true,
        default: 'active'
    },
    role: {
        type: String,
        required: true,
        trim: true,
        default: 'customer'
    },
   
    number: {
        type: String,
        trim: true,
        required: true,
        minlength: 5,
        maxlength: 25,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    partner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Partner',
    },
    meta: {
        type: Map,
    },  
})

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id , role: this.role }, process.env.jwtPrivateKey);
    return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const iranianMobileNumberRegex = /^09\d{9}$/;
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        number: Joi.string().pattern(iranianMobileNumberRegex).required(),
        password: Joi.string().min(5).max(255).required().messages({
            "string.base": `Password should be a type of 'text'`,
            "string.empty": `Password cannot be an empty`,
            "string.min": `Password should have a minimum length of {#limit}`,
            "string.max": `Password should have a maximum length of {#limit}`,
            "any.required": `Password is a required field`
        }),
        role: Joi.string(),
        status: Joi.string(),
        partner: Joi.string(),
        meta: Joi.object(),

    });

    return schema.validate(user);

}

exports.User = User;
exports.validate = validateUser;
