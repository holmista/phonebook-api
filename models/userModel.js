const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "A user should have an username"],
    minlength: 2,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "A user should have a password"],
    minlength: 6,
    select: false,
  },
  contacts: [{
    type: mongoose.Schema.Types.ObjectID,
    ref: "Contact",
  }],
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.correctPassword = async (
  candidatePassword,
  userPassword,
) => {
  const valid = await bcrypt.compare(candidatePassword, userPassword);
  return valid;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
