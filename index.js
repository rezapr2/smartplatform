const express = require("express");
const { default: mongoose } = require("mongoose");

const auth = require("./routes/auth");
const partners = require("./routes/partners");
const users = require("./routes/users");
const deviceTypes = require("./routes/deviceTypes");
const devices = require("./routes/devices");
const messages = require("./routes/messages");
const path = require('path')

const app = express();

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/SmartPlatform")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error(err));

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const https_options = {
  /*      ca: fs.readFileSync("/home/admin/conf/web/api.foodbell.co.uk/ssl/api.foodbell.co.uk.ca"),
        key: fs.readFileSync("/home/admin/conf/web/api.foodbell.co.uk/ssl/api.foodbell.co.uk.key"),
        cert: fs.readFileSync("/home/admin/conf/web/api.foodbell.co.uk/ssl/api.foodbell.co.uk.crt"),    
     **/
};
const http = require("http").Server(app);
const https = require("https").Server(https_options, app);

app.get("/", (req, res) => {
  res.send("Hello, SmartPlatform!");
});

// Add the following lines to use the Swagger documentation
const swaggerApp = require("./swagger");
app.use("/api-docs", swaggerApp);

app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/partners", partners);
app.use("/api/devicestypes", deviceTypes);
app.use("/api/devices", devices);
app.use("/api/messages", messages);


const port = process.env.PORT || 3000;

http.listen(port, () => {
  console.log(`Listen on ${port}`);
});

https.listen(8000, () => {
  console.log(`Listen on ${8000}`);
});
