const express = require("express");
const {
  makeCall,
} = require("../controllers/callController");
const { auth } = require("../controllers/authController");

const router = express.Router();

router.post("/", auth, makeCall);

module.exports = router;
