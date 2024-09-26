const scenariosService = require("../services/scenariosService");

const addNewScenario = async (req, res) => {
  const params = req.body;
  const response = await scenariosService.addNewScenario(params);

  res.status(response.code).send(response.data);
};

const getScenarios = async (req, res) => {
  const response = await scenariosService.getScenarios();

  res.status(response.code).send(response.data);
};

const getScenariosByUser = async (req, res) => {
  const { userId } = req.params;

  const response = await scenariosService.getScenariosByUser(userId);

  res.status(response.code).send(response.data);
};

const getScenario = async (req, res) => {
  const { scenarioId } = req.params;

  const response = await scenariosService.getScenario(scenarioId);

  res.status(response.code).send(response.data);
};

const updateScenario = async (req, res) => {
  const { scenarioId } = req.params;
  const params = req.body;

  const response = await scenariosService.updateScenario(scenarioId, params);

  res.status(response.code).send(response.data);
};

const updateScenarioMeta = async (req, res) => {
  const { scenarioId } = req.params;
  const { key, value } = req.body;

  const response = await scenariosService.updateScenarioMeta(scenarioId, key, value);

  res.status(response.code).send(response.data);
};

const deleteScenario = async (req, res) => {
  const { scenarioId } = req.params;

  const response = await scenariosService.deleteScenario(scenarioId);

  res.status(response.code).send(response.data);
};

const uploadImage = async (req, res) => {
  const { scenarioId, metaKey } = req.params;
  const imageFile = req.file; // Retrieve the uploaded image file

  const response = await scenariosService.uploadImage(
    scenarioId,
    metaKey,
    imageFile
  );

  res.status(response.code).send(response.data);
};

module.exports = {
  addNewScenario,
  getScenarios,
  getScenariosByUser,
  getScenario,
  updateScenario,
  deleteScenario,
  updateScenarioMeta,
  uploadImage,
};
