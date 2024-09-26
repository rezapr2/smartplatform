const { Scenario, validate } = require("../models/scenario");
require("dotenv").config();

/**
 * Function to add a new scenario to the system.
 *
 * @param {Object} params - The parameters for the new scenario.
 * @return {Object} The result of adding a new scenario.
 */
const addNewScenario = async (params) => {
  const { error } = validate(params);
  if (error)
    return {
      success: false,
      code: 400,
      data: error.details[0].message,
    };

  try {
    const scenario = new Scenario({
      name: params.name,
      time: params.time,
      commands: params.commands,
      device: params.device,
      user: params.user,
      meta: params.meta,
    });

    await scenario.save();

    return {
      success: true,
      code: 200,
      data: {
        _id: scenario._id,
        name: scenario.name,
        time: scenario.time,
        commands: scenario.commands,
        device: scenario.device,
        meta: scenario.meta,
      },
    };
  } catch (error) {
    console.log("error", error);
    return {
      success: false,
      code: 500,
      data: "Creating Scenario Failed",
    };
  }
};

/**
 * Retrieves all scenarios from the database and returns them.
 *
 * @return {Object} An object with success status, status code, and scenario data
 */
const getScenarios = async () => {
  let scenarios;

  try {
    scenarios = await Scenario.find({}).select("-__v");

    if (!scenarios) {
      return {
        success: false,
        code: 500,
        data: "Could not find a scenarios",
      };
    }

    return {
      success: true,
      code: 200,
      data: scenarios,
    };
  } catch {
    return {
      success: false,
      code: 500,
      data: "Could not find a scenarios",
    };
  }
};

const getScenariosByUser = async (userId) => {
  let scenarios;

  try {
    scenarios = await Scenario.find({ user: userId }).select("-__v");

    if (!scenarios) {
      return {
        success: false,
        code: 500,
        data: "Could not find a scenarios",
      };
    }

    return {
      success: true,
      code: 200,
      data: scenarios,
    };
  } catch {
    return {
      success: false,
      code: 500,
      data: "Could not find a scenarios",
    };
  }
};

/**
 * Retrieves a scenario by their ID from the database.
 *
 * @param {string} scenarioId - The ID of the scenario to retrieve.
 * @return {object} An object with success status, code, and scenario data.
 */
const getScenario = async (scenarioId) => {
  let scenario;

  try {
    scenario = await Scenario.findById(scenarioId).select("-__v");

    if (!scenario) {
      return {
        success: false,
        code: 500,
        data: "Could not find a scenario",
      };
    }

    return {
      success: true,
      code: 200,
      data: scenario,
    };
  } catch {
    return {
      success: false,
      code: 500,
      data: "Could not find a scenario",
    };
  }
};

/**
 * Updates a scenario's information in the database.
 *
 * @param {string} scenarioId - The ID of the scenario to update
 * @param {object} params - The updated scenario information
 * @return {object} An object with success status, code, and updated scenario data
 */
const updateScenario = async (scenarioId, params) => {
  let scenario;

  try {
    scenario = await Scenario.findByIdAndUpdate(
      scenarioId,
      {
        name: params.name,
        time: params.time,
        commands: params.commands,
        device: params.device,
        meta: params.meta,
      },
      {
        new: true,
      }
    );

    if (!scenario) {
      return {
        success: false,
        code: 500,
        data: "Could not find a scenario",
      };
    }

    return {
      success: true,
      code: 200,
      data: scenario,
    };
  } catch (e) {
    console.log(e);
    console.log(e);
    return {
      success: false,
      code: 500,
      data: "Could not find a skill",
    };
  }
};

const updateScenarioMeta = async (scenarioId, key, value) => {
  let scenario;

  try {
    scenario = await Scenario.findByIdAndUpdate(
      scenarioId,
      {
        [`meta.${key}`]: value,
      },
      {
        new: true,
      }
    );

    if (!scenario) {
      return {
        success: false,
        code: 500,
        data: "Could not find a scenario",
      };
    }

    return {
      success: true,
      code: 200,
      data: scenario,
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      code: 500,
      data: "Could not find a scenario",
    };
  }
};

/**
 * Deletes a scenario by their ID.
 *
 * @param {string} scenarioId - The ID of the scenario to be deleted
 * @return {object} The result of the deletion operation, including success status, code, and data
 */
const deleteScenario = async (scenarioId) => {
  let scenario;

  try {
    scenario = await Scenario.findByIdAndDelete(scenarioId);

    if (!scenario) {
      return {
        success: false,
        code: 500,
        data: "Could not find a scenario",
      };
    }

    return {
      success: true,
      code: 200,
      data: true,
    };
  } catch {
    return {
      success: false,
      code: 500,
      data: "Could not find a scenario",
    };
  }
};



module.exports = {
  addNewScenario,
  getScenarios,
  getScenariosByUser,
  getScenario,
  updateScenario,
  deleteScenario,
  updateScenarioMeta,
};
