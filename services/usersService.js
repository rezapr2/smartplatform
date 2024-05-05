const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");

/**
 * Function to add a new user to the system.
 *
 * @param {Object} params - The parameters for the new user.
 * @return {Object} The result of adding a new user.
 */
const addNewUser = async (params) => {
  const { error } = validate(params);
  if (error)
    return {
      success: false,
      code: 400,
      data: "error.details[0].message",
    }; 

    let user = await User.findOne({
      $or: [{ number: params.number }],
    });

    if (user)
      return {
        success: false,
        code: 400,
        data: "An User already registered with this number",
      };

  try {
    user = new User({
      name: params.name,
      number: params.number,
      password: params.password,
      meta: params.meta,
      role: params.role,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = user.generateAuthToken();

    return {
      success: true,
      code: 200,
      data: user,
      token: token
    };
  } catch (error) {
    console.log("error", error);
    return {
      success: false,
      code: 500,
      data: "Creating User Failed",
    };
  }
};

/**
 * Retrieves all users from the database and returns them.
 *
 * @return {Object} An object with success status, status code, and user data
 */
const getUsers = async () => {
  let users;

  try {
    users = await User.find({}).select("-__v -password");

    if (!users) {
      return {
        success: false,
        code: 500,
        data: "Could not find a users",
      };
    }

    return {
      success: true,
      code: 200,
      data: users,
    };
  } catch {
    return {
      success: false,
      code: 500,
      data: "Could not find a users",
    };
  }
};

/**
 * Retrieves a user by their ID from the database.
 *
 * @param {string} userId - The ID of the user to retrieve.
 * @return {object} An object with success status, code, and user data.
 */
const getUser = async (userId) => {
  let user;

  try {
    user = await User.findById(userId).select("-__v -password");

    if (!user) {
      return {
        success: false,
        code: 500,
        data: "Could not find a user",
      };
    }

    return {
      success: true,
      code: 200,
      data: user,
    };
  } catch {
    return {
      success: false,
      code: 500,
      data: "Could not find a user",
    };
  }
};

/**
 * Updates a user's information in the database.
 *
 * @param {string} userId - The ID of the user to update
 * @param {object} params - The updated user information
 * @return {object} An object with success status, code, and updated user data
 */
const updateUser = async (userId, params) => {
  let user;

  try {
    user = await User.findByIdAndUpdate(
      userId,
      {
        name: params.name,
        number: params.number,
        address: params.address,
      },
      {
        new: true,
      }
    );

    if (!user) {
      return {
        success: false,
        code: 500,
        data: "Could not find a user",
      };
    }

    return {
      success: true,
      code: 200,
      data: user,
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

const updateUserMeta = async (userId, key, value) => {
  let user;

  try {
    
    user = await User.findByIdAndUpdate(
      userId,
      {
        [`meta.${key}`]: value
      },
      {
        new: true,
      }
    )

    if (!user) {
      return {
        success: false,
        code: 500,
        data: "Could not find a user",
      };
    }

    return {
      success: true,
      code: 200,
      data: user,
    }
  }
  catch (e) {
    console.log(e);
    return {
      success: false,
      code: 500,
      data: "Could not find a user",
    };
  }
}

/**
 * Deletes a user by their ID.
 *
 * @param {string} userId - The ID of the user to be deleted
 * @return {object} The result of the deletion operation, including success status, code, and data
 */
const deleteUser = async (userId) => {
  let user;

  try {
    user = await User.findByIdAndDelete(userId);

    if (!user) {
      return {
        success: false,
        code: 500,
        data: "Could not find a user",
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
      data: "Could not find a user",
    };
  }
};

module.exports = {
  addNewUser,
  getUsers,
  getUser,
  updateUser,
  updateUserMeta,
  deleteUser,
};
