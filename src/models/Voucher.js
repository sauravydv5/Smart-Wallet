const mongoose = require("mongoose");

const voucherSchema = new mongoose.Schema({
  brand: String,
  value: Number,
  isActive: Boolean,
});

module.exports = mongoose.model("Voucher", voucherSchema);
