const Joi = require('joi');
const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    deviceType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DeviceType',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    meta: {
        type: Map,
    },  
})


const Device = mongoose.model('Device', deviceSchema);

function validateDevice(device) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        deviceType: Joi.string().required(),
        user: Joi.string().required(),
        meta: Joi.object(),

    });

    return schema.validate(device);

}

exports.Device = Device;
exports.validate = validateDevice;
