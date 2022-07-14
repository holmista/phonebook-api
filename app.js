const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRoute");
const contactRouter = require("./routes/contactRoutes");
const callRouter = require("./routes/callRoutes");

mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("connected to mongodb!"));

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/contact", contactRouter);
app.use("/api/call", callRouter);
app.use("*", (req, res) => {
  res.status(404).json({ status: "fail", message: "Not found" });
});
app.use((err, req, res, next) => {
  res.status(500).json({ status: "fail", message: "Server error" });
});
const port = process.env.PORT;
app.listen(port, () => console.log(`running on port ${port}`));
