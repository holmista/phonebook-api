const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A contact should have a name"],
    validate: {
      validator(val) {
        const valid = !/\d/.test(val);
        return valid;
      },
      message: "name should not contain numbers",
    },

  },
  number: {
    type: Number,
    required: [true, "A contact should have a number"],
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not a valid number",
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectID,
    ref: "User",
    required: [true, "a contact should belong to some user"],
  },
});

const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;
