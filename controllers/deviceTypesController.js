const deviceTypesService = require("../services/deviceTypesService");

const addNewDeviceType = async (req, res) => {
  const params = req.body;
  const response = await deviceTypesService.addNewDeviceType(params);

  if (response.code !== 200) {
    res.status(response.code).send(response.data);
  } else {
    res.header("x-auth-token", response.token).send({
      id: response.data._id,
      name: response.data.firstname,
      number: response.data.number,
    });
  }
};

const getDeviceTypes = async (req, res) => {
  const response = await deviceTypesService.getDeviceTypes();

  res.status(response.code).send(response.data);
};



const getDeviceType = async (req, res) => {
  const { deviceTypeId } = req.params;

  const response = await deviceTypesService.getDeviceType(deviceTypeId);

  res.status(response.code).send(response.data);
};

const updateDeviceType = async (req, res) => {
  const { deviceTypeId } = req.params;
  const params = req.body;

  const response = await deviceTypesService.updateDeviceType(deviceTypeId, params);

  res.status(response.code).send(response.data);
};

const updateDeviceTypeMeta = async (req, res) => {
  const { deviceTypeId } = req.params;
  const { key, value } = req.body;

  const response = await deviceTypesService.updateDeviceTypeMeta(deviceTypeId, key, value);

  res.status(response.code).send(response.data);
}

const deleteDeviceType = async (req, res) => {
  const { deviceTypeId } = req.params;

  const response = await deviceTypesService.deleteDeviceType(deviceTypeId);

  res.status(response.code).send(response.data);
};

module.exports = {
  addNewDeviceType,
  getDeviceTypes,
  getDeviceType,
  updateDeviceType,
  deleteDeviceType,
  updateDeviceTypeMeta,
};
