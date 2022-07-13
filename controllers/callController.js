const Call = require("../models/callModel");

const makeCall = async (req, res) => {
  try {
    await Call.create(req.body);
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

module.exports = { makeCall };
