const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, index: true },
    type: { type: String, enum: ["CREDIT", "DEBIT"] },
    amount: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
