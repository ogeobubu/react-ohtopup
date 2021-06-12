const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  service: {
    type: String,
  },
  amount: {
    type: String,
  },
  method: {
    type: String,
  },
  status: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Transaction = mongoose.model("OhTopUpTransaction", transactionSchema);

module.exports = Transaction;
