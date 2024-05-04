const { DeviceType, validate } = require("../models/deviceType");

/**
 * Function to add a new deviceType to the system.
 *
 * @param {Object} params - The parameters for the new deviceType.
 * @return {Object} The result of adding a new deviceType.
 */
const addNewDeviceType = async (params) => {
  
  const { error } = validate(params);
  if (error)
    return {
      success: false,
      code: 400,
      data: "error.details[0].message",
    }; 


  try {
    deviceType = new DeviceType({
      name: params.name,
      meta: params.meta,
    });

    await deviceType.save();


    return {
      success: true,
      code: 200,
      data: {
        _id: deviceType._id,
        name: deviceType.name,
        meta: deviceType.meta
      },
    };
  } catch (error) {
    console.log("error", error);
    return {
      success: false,
      code: 500,
      data: "Creating DeviceType Failed",
    };
  }
};

/**
 * Retrieves all deviceTypes from the database and returns them.
 *
 * @return {Object} An object with success status, status code, and deviceType data
 */
const getDeviceTypes = async () => {
  let deviceTypes;

  try {
    deviceTypes = await DeviceType.find({}).select("-__v");

    if (!deviceTypes) {
      return {
        success: false,
        code: 500,
        data: "Could not find a deviceTypes",
      };
    }

    return {
      success: true,
      code: 200,
      data: deviceTypes,
    };
  } catch {
    return {
      success: false,
      code: 500,
      data: "Could not find a deviceTypes",
    };
  }
};


/**
 * Retrieves a deviceType by their ID from the database.
 *
 * @param {string} deviceTypeId - The ID of the deviceType to retrieve.
 * @return {object} An object with success status, code, and deviceType data.
 */
const getDeviceType = async (deviceTypeId) => {
  let deviceType;

  try {
    deviceType = await DeviceType.findById(deviceTypeId).select("-__v");

    if (!deviceType) {
      return {
        success: false,
        code: 500,
        data: "Could not find a deviceType",
      };
    }

    return {
      success: true,
      code: 200,
      data: deviceType,
    };
  } catch {
    return {
      success: false,
      code: 500,
      data: "Could not find a deviceType",
    };
  }
};

/**
 * Updates a deviceType's information in the database.
 *
 * @param {string} deviceTypeId - The ID of the deviceType to update
 * @param {object} params - The updated deviceType information
 * @return {object} An object with success status, code, and updated deviceType data
 */
const updateDeviceType = async (deviceTypeId, params) => {
  let deviceType;

  try {
    deviceType = await DeviceType.findByIdAndUpdate(
      deviceTypeId,
      {
        name: params.name,
        meta: params.meta,
      },
      {
        new: true,
      }
    );

    if (!deviceType) {
      return {
        success: false,
        code: 500,
        data: "Could not find a deviceType",
      };
    }

    return {
      success: true,
      code: 200,
      data: deviceType,
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

const updateDeviceTypeMeta = async (deviceTypeId, key, value) => {
  let deviceType;

  try {
    
    deviceType = await DeviceType.findByIdAndUpdate(
      deviceTypeId,
      {
        [`meta.${key}`]: value
      },
      {
        new: true,
      }
    )

    if (!deviceType) {
      return {
        success: false,
        code: 500,
        data: "Could not find a deviceType",
      };
    }

    return {
      success: true,
      code: 200,
      data: deviceType,
    }
  }
  catch (e) {
    console.log(e);
    return {
      success: false,
      code: 500,
      data: "Could not find a deviceType",
    };
  }
}

/**
 * Deletes a deviceType by their ID.
 *
 * @param {string} deviceTypeId - The ID of the deviceType to be deleted
 * @return {object} The result of the deletion operation, including success status, code, and data
 */
const deleteDeviceType = async (deviceTypeId) => {
  let deviceType;

  try {
    deviceType = await DeviceType.findByIdAndDelete(deviceTypeId);

    if (!deviceType) {
      return {
        success: false,
        code: 500,
        data: "Could not find a deviceType",
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
      data: "Could not find a deviceType",
    };
  }
};

module.exports = {
  addNewDeviceType,
  getDeviceTypes,
  getDeviceType,
  updateDeviceType,
  deleteDeviceType,
  updateDeviceTypeMeta,

};
