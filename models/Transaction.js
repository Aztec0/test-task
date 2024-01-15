const mongoose = require("mongoose");

const ImportedUsers = require("../models/importedUsers");

const transactionSchema = new mongoose.Schema({
  destination: String,
  amount: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
