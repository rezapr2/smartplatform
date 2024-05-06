const devicesService = require("../services/devicesService");

const addNewDevice= async (req, res) => {
  const params = req.body;
  const response = await devicesService.addNewDevice(params);

  res.status(response.code).send(response.data);

  
};

const getDevices = async (req, res) => {
  const response = await devicesService.getDevices();

  res.status(response.code).send(response.data);
};

const getDevicesByUser = async (req, res) => {

  const { userId } = req.params;

  const response = await devicesService.getDevicesByUser(userId);

  res.status(response.code).send(response.data);
}

const getDevice= async (req, res) => {
  const { deviceId } = req.params;

  const response = await devicesService.getDevice(deviceId);

  res.status(response.code).send(response.data);
};

const updateDevice= async (req, res) => {
  const { deviceId } = req.params;
  const params = req.body;

  const response = await devicesService.updateDevice(
    deviceId,
    params
  );

  res.status(response.code).send(response.data);
};

const updateDeviceMeta = async (req, res) => {
  const { deviceId } = req.params;
  const { key, value } = req.body;

  const response = await devicesService.updateDeviceMeta(
    deviceId,
    key,
    value
  );

  res.status(response.code).send(response.data);
};

const deleteDevice= async (req, res) => {
  const { deviceId } = req.params;

  const response = await devicesService.deleteDevice(deviceId);

  res.status(response.code).send(response.data);
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
