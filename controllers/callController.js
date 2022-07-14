const Call = require("../models/callModel");

const makeCall = async (req, res) => {
  try {
    await Call.create({ user: req.user.id, contact: req.body.contact });
    res.status(201).json({ status: "success" });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

module.exports = { makeCall };
