const partnersService = require("../services/partnersService");

const addNewPartner = async (req, res) => {
  const params = req.body;
  const response = await partnersService.addNewPartner(params);

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

const getPartners = async (req, res) => {
  const response = await partnersService.getPartners();

  res.status(response.code).send(response.data);
};

const getPartnersByWorkspaceId = async (req, res) => {
  const { workspaceId } = req.params;

  const response = await partnersService.getPartnersByWorkspaceId(workspaceId);

  res.status(response.code).send(response.data);
};

const getPartner = async (req, res) => {
  const { partnerId } = req.params;

  const response = await partnersService.getPartner(partnerId);

  res.status(response.code).send(response.data);
};

const updatePartner = async (req, res) => {
  const { partnerId } = req.params;
  const params = req.body;

  const response = await partnersService.updatePartner(partnerId, params);

  res.status(response.code).send(response.data);
};

const updatePartnerMeta = async (req, res) => {
  const { partnerId } = req.params;
  const { key, value } = req.body;

  const response = await partnersService.updatePartnerMeta(partnerId, key, value);

  res.status(response.code).send(response.data);
}

const deletePartner = async (req, res) => {
  const { partnerId } = req.params;

  const response = await partnersService.deletePartner(partnerId);

  res.status(response.code).send(response.data);
};

module.exports = {
  addNewPartner,
  getPartners,
  getPartner,
  updatePartner,
  deletePartner,
  updatePartnerMeta,
};
