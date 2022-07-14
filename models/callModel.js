const mongoose = require("mongoose");

const callSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectID,
    ref: "User",
    required: [true, "a call should have a user"],
  },
  contact: {
    type: mongoose.Schema.Types.ObjectID,
    ref: "Contact",
    required: [true, "a call should have a contact"],
  },
  timeStamp: {
    type: Date,
    default: Date.now,
    required: [true, "a call should have a timestamp"],
  },
});

const Call = mongoose.model("Call", callSchema);
module.exports = Call;
