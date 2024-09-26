const Joi = require("joi");
const mongoose = require("mongoose");

const scenarioSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
  },
  time: {
    type: String,
    required: true,
    trim: true,
  },
  commands: {
    type: Array,
    required: true,
  },
  device: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Device",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  meta: {
    type: Map,
  },
});

const Scenario = mongoose.model("Scenario", scenarioSchema);

function validateScenario(scenario) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    time: Joi.string(),
    commands: Joi.array(),
    device: Joi.string(),
    user: Joi.string().required(),
    meta: Joi.object(),
  });

  return schema.validate(scenario);
}

exports.Scenario = Scenario;
exports.validate = validateScenario;
