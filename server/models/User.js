const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  number: {
    type: String,
  },
  verified: {
    type: String,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("OhTopUpUser", userSchema);

module.exports = User;
