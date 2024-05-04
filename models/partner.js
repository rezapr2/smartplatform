require('dotenv').config()
const jwt = require("jsonwebtoken");
const Joi = require('joi');
const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100
    },
    status: {
        type: String,
        required: true,
        trim: true,
        default: 'active'
    },
    number: {
        type: String,
        trim: true,
        required: true,
        minlength: 5,
        maxlength: 25,
        unique: true
    },
    meta: {
        type: Map,
    },
    
})



const Partner = mongoose.model('Partner', partnerSchema);

function validatePartner(partner) {
    const iranianMobileNumberRegex = /^09\d{9}$/;

    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        number: Joi.string().pattern(iranianMobileNumberRegex).required(),
        status: Joi.string(),
        meta: Joi.object(),

    });

    return schema.validate(partner);

}

exports.Partner = Partner;
exports.validate = validatePartner;
