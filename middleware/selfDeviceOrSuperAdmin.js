require("dotenv").config();
const jwt = require("jsonwebtoken");

const devicesService = require("../services/devicesService");

module.exports = function selfDeviceOrSuperAdmin(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");


  try {
    const decoded = jwt.verify(token, process.env.jwtPrivateKey);

    const customerId = decoded.id;
    const deviceId = req.params.deviceId; // Assuming customer ID is passed as a parameter
  
    devicesService.getDevice(deviceId).then((device) => {
      if (device.customerId === customerId || decoded.role === "super_admin") {
        next();
      } else {
        return res.status(403).send("Access denied");
      }
    });
  } catch (ex) {
    res.status(400).send("Access denied.");
  }
};
