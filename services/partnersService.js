const { Partner, validate } = require("../models/partner");

/**
 * Function to add a new partner to the system.
 *
 * @param {Object} params - The parameters for the new partner.
 * @return {Object} The result of adding a new partner.
 */
const addNewPartner = async (params) => {
  
  const { error } = validate(params);
  if (error)
    return {
      success: false,
      code: 400,
      data: "error.details[0].message",
    }; 

  let partner = await Partner.findOne({
    $or: [{ number: params.number }],
  });
  if (partner)
    return {
      success: false,
      code: 400,
      data: "An Partner already registered with this number",
    };

  try {
    partner = new Partner({
      name: params.name,
      number: params.number,
      status: params.status,
      meta: params.meta,
    });

    await partner.save();


    return {
      success: true,
      code: 200,
      data: partner,
    };
  } catch (error) {
    console.log("error", error);
    return {
      success: false,
      code: 500,
      data: "Creating Partner Failed",
    };
  }
};

/**
 * Retrieves all partners from the database and returns them.
 *
 * @return {Object} An object with success status, status code, and partner data
 */
const getPartners = async () => {
  let partners;

  try {
    partners = await Partner.find({}).select("-__v");

    if (!partners) {
      return {
        success: false,
        code: 500,
        data: "Could not find a partners",
      };
    }

    return {
      success: true,
      code: 200,
      data: partners,
    };
  } catch {
    return {
      success: false,
      code: 500,
      data: "Could not find a partners",
    };
  }
};


/**
 * Retrieves a partner by their ID from the database.
 *
 * @param {string} partnerId - The ID of the partner to retrieve.
 * @return {object} An object with success status, code, and partner data.
 */
const getPartner = async (partnerId) => {
  let partner;

  try {
    partner = await Partner.findById(partnerId).select("-__v");

    if (!partner) {
      return {
        success: false,
        code: 500,
        data: "Could not find a partner",
      };
    }

    return {
      success: true,
      code: 200,
      data: partner,
    };
  } catch {
    return {
      success: false,
      code: 500,
      data: "Could not find a partner",
    };
  }
};

/**
 * Updates a partner's information in the database.
 *
 * @param {string} partnerId - The ID of the partner to update
 * @param {object} params - The updated partner information
 * @return {object} An object with success status, code, and updated partner data
 */
const updatePartner = async (partnerId, params) => {
  let partner;

  try {
    partner = await Partner.findByIdAndUpdate(
      partnerId,
      {
        name: params.name,
        number: params.number,
        status: params.status,
        meta: params.meta,
      },
      {
        new: true,
      }
    );

    if (!partner) {
      return {
        success: false,
        code: 500,
        data: "Could not find a partner",
      };
    }

    return {
      success: true,
      code: 200,
      data: partner,
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

const updatePartnerMeta = async (partnerId, key, value) => {
  let partner;

  try {
    
    partner = await Partner.findByIdAndUpdate(
      partnerId,
      {
        [`meta.${key}`]: value
      },
      {
        new: true,
      }
    )

    if (!partner) {
      return {
        success: false,
        code: 500,
        data: "Could not find a partner",
      };
    }

    return {
      success: true,
      code: 200,
      data: partner,
    }
  }
  catch (e) {
    console.log(e);
    return {
      success: false,
      code: 500,
      data: "Could not find a partner",
    };
  }
}

/**
 * Deletes a partner by their ID.
 *
 * @param {string} partnerId - The ID of the partner to be deleted
 * @return {object} The result of the deletion operation, including success status, code, and data
 */
const deletePartner = async (partnerId) => {
  let partner;

  try {
    partner = await Partner.findByIdAndDelete(partnerId);

    if (!partner) {
      return {
        success: false,
        code: 500,
        data: "Could not find a partner",
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
      data: "Could not find a partner",
    };
  }
};

module.exports = {
  addNewPartner,
  getPartners,
  getPartner,
  updatePartner,
  deletePartner,
  updatePartnerMeta,

};
