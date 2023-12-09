const express = require("express");
const router = express.Router();

//import controller
const{signup} = require("../controller/checkSignup.js");

//define signup routes
router.post("/signup",signup);

module.exports = router;