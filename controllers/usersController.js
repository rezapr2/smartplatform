const usersService = require("../services/usersService");

const addNewUser = async (req, res) => {

    const params = req.body;

    const response = await usersService.addNewUser(params);

    res.status(response.code).send(response.data);
}

const getUsers = async (req, res) => {
    const response = await usersService.getUsers();
  
    res.status(response.code).send(response.data);
  };
  

  
  const getUser = async (req, res) => {
    const { userId } = req.params;
  
    const response = await usersService.getUser(userId);
  
    res.status(response.code).send(response.data);
  };
  
  const updateUser = async (req, res) => {
    const { userId } = req.params;
    const params = req.body;
  
    const response = await usersService.updateUser(userId, params);
  
    res.status(response.code).send(response.data);
  };

  const updateUserMeta = async (req, res) => {
    const { userId } = req.params;
    const { key, value } = req.body;

    const response = await usersService.updateUserMeta(userId, key, value);

    res.status(response.code).send(response.data);
  }
  
  const deleteUser = async (req, res) => {
    const { userId } = req.params;
  
    const response = await usersService.deleteUser(userId);
  
    res.status(response.code).send(response.data);
  };
  

  module.exports = {
    addNewUser,
    getUsers,
    getUser,
    updateUser,
    updateUserMeta,
    deleteUser,
  };