const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const userRouter = require("./routes/userRoute");
const contactRouter = require("./routes/contactRoutes");

mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("connected to mongodb!"));

const app = express();

app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/contact", contactRouter);

const port = process.env.PORT;
app.listen(port, () => console.log(`running on port ${port}`));
