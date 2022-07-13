const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const signup = async (req, res) => {
  try {
    if (req.body.password !== req.body.confirmPassword) {
      throw new Error("passwords do not match");
    }
    await User.create({
      username: req.body.username,
      password: req.body.password,
    });
    res.status(201).json({
      status: "success",
      data: { },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).select("+password");
    if (!user || !(await user.correctPassword(password, user.password))) {
      throw new Error("invalid user or password");
    }
    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.status(200).json({
      status: "success",
      token,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

const auth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) throw new Error("authorization required");
    const { username } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    const user = await User.findOne({ username });
    if (!user) throw new Error("invalid user");
    req.user = user;
    next();
  } catch (err) {
    if (err === "authorization required" || err === "invalid user") {
      res.status(401).json({ status: "fail", message: err.message });
    } else {
      res.status(500).json({
        status: "fail",
        message: err.message,
      });
    }
  }
};

module.exports = { signup, login, auth };
