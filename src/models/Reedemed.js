const mongoose = require("mongoose");

const redeemedSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, index: true },
    voucherId: mongoose.Schema.Types.ObjectId,
    voucherValue: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("RedeemedReward", redeemedSchema);
