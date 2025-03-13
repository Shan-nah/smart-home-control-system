const express = require("express");
const { controlDevice } = require("../controllers/deviceController");

const router = express.Router();

router.post("/control", controlDevice);

module.exports = router;
