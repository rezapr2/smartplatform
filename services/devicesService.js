const { Device, validate } = require("../models/device");

/**
 * Function to add a new device to the system.
 *
 * @param {Object} params - The parameters for the new device.
 * @return {Object} The result of adding a new device.
 */
const addNewDevice = async (params) => {
  
  const { error } = validate(params);
  if (error)
    return {
      success: false,
      code: 400,
      data: "error.details[0].message",
    }; 


  try {
    device = new Device({
      name: params.name,
      meta: params.meta,
    });

    await device.save();


    return {
      success: true,
      code: 200,
      data: {
        _id: device._id,
        name: device.name,
        meta: device.meta
      },
    };
  } catch (error) {
    console.log("error", error);
    return {
      success: false,
      code: 500,
      data: "Creating Device Failed",
    };
  }
};

/**
 * Retrieves all devices from the database and returns them.
 *
 * @return {Object} An object with success status, status code, and device data
 */
const getDevices = async () => {
  let devices;

  try {
    devices = await Device.find({}).select("-__v");

    if (!devices) {
      return {
        success: false,
        code: 500,
        data: "Could not find a devices",
      };
    }

    return {
      success: true,
      code: 200,
      data: devices,
    };
  } catch {
    return {
      success: false,
      code: 500,
      data: "Could not find a devices",
    };
  }
};

const getDevicesByUser = async (userId) => {
  let devices;

  try {
    devices = await Device.find({ user: userId }).select("-__v");

    if (!devices) {
      return {
        success: false,
        code: 500,
        data: "Could not find a devices",
      };
    }

    return {
      success: true,
      code: 200,
      data: devices,
    }
  }
  catch {
    return {
      success: false,
      code: 500,
      data: "Could not find a devices",
    };
  }
  
}


/**
 * Retrieves a device by their ID from the database.
 *
 * @param {string} deviceId - The ID of the device to retrieve.
 * @return {object} An object with success status, code, and device data.
 */
const getDevice = async (deviceId) => {
  let device;

  try {
    device = await Device.findById(deviceId).select("-__v");

    if (!device) {
      return {
        success: false,
        code: 500,
        data: "Could not find a device",
      };
    }

    return {
      success: true,
      code: 200,
      data: device,
    };
  } catch {
    return {
      success: false,
      code: 500,
      data: "Could not find a device",
    };
  }
};

/**
 * Updates a device's information in the database.
 *
 * @param {string} deviceId - The ID of the device to update
 * @param {object} params - The updated device information
 * @return {object} An object with success status, code, and updated device data
 */
const updateDevice = async (deviceId, params) => {
  let device;

  try {
    device = await Device.findByIdAndUpdate(
      deviceId,
      {
        name: params.name,
        meta: params.meta,
      },
      {
        new: true,
      }
    );

    if (!device) {
      return {
        success: false,
        code: 500,
        data: "Could not find a device",
      };
    }

    return {
      success: true,
      code: 200,
      data: device,
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

const updateDeviceMeta = async (deviceId, key, value) => {
  let device;

  try {
    
    device = await Device.findByIdAndUpdate(
      deviceId,
      {
        [`meta.${key}`]: value
      },
      {
        new: true,
      }
    )

    if (!device) {
      return {
        success: false,
        code: 500,
        data: "Could not find a device",
      };
    }

    return {
      success: true,
      code: 200,
      data: device,
    }
  }
  catch (e) {
    console.log(e);
    return {
      success: false,
      code: 500,
      data: "Could not find a device",
    };
  }
}

/**
 * Deletes a device by their ID.
 *
 * @param {string} deviceId - The ID of the device to be deleted
 * @return {object} The result of the deletion operation, including success status, code, and data
 */
const deleteDevice = async (deviceId) => {
  let device;

  try {
    device = await Device.findByIdAndDelete(deviceId);

    if (!device) {
      return {
        success: false,
        code: 500,
        data: "Could not find a device",
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
      data: "Could not find a device",
    };
  }
};

module.exports = {
  addNewDevice,
  getDevices,
  getDevicesByUser,
  getDevice,
  updateDevice,
  deleteDevice,
  updateDeviceMeta,

};
