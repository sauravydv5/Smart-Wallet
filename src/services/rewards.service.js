const Wallet = require("../models/Wallet");
const Voucher = require("../models/Voucher");
const Redeemed = require("../models/Reedemed");
const ApiError = require("../utils/ApiError");

exports.redeemVoucher = async (userId, voucherId) => {
  const voucher = await Voucher.findById(voucherId);
  if (!voucher || !voucher.isActive) throw new ApiError(400, "Invalid voucher");

  const wallet = await Wallet.findOne({ userId });
  if (wallet.balance < voucher.value)
    throw new ApiError(400, "Insufficient Balance");

  wallet.balance -= voucher.value;
  await wallet.save();

  await Redeemed.create({
    userId,
    voucherId,
    voucherValue: voucher.value,
  });

  return { message: "Voucher redeemed successfully" };
};
