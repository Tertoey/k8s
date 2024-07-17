const express = require("express");
const router = express.Router();
const data = require("../controller/sensors");
const lineBot = require("../controller/line");
// const cors = require('cors')

require("dotenv").config();

// router.all('*', cors());
router.get("/sensors", data.sensors);
router.get("/users", data.users);
router.get("/weather", data.weather);

router.post("/weathersearch", data.weatherSearch);
router.post("/savesensors", data.saveSensorsData);
router.post("/saveuser", data.saveUser);
router.post("/finduser", data.findusers);

router.get("/am319", data.am319);
router.get("/", (req, res) => {
  res.send("Hello World");
});
router.get("/health", (req, res) => {
  const data = {
    uptime: process.uptime(),
    message: "Ok",
    date: new Date(),
  };

  res.status(200).send(data);
});

router.post("/line", lineBot.line_test);

module.exports = router;
