const Joi = require('joi');
const mongoose = require('mongoose');

const deviceTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    
    meta: {
        type: Map,
    },  
})


const DeviceType = mongoose.model('DeviceType', deviceTypeSchema);

function validateDeviceType(deviceType) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        meta: Joi.object(),

    });

    return schema.validate(deviceType);

}

exports.DeviceType = DeviceType;
exports.validate = validateDeviceType;
