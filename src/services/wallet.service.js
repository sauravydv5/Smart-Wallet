const Wallet = require("../models/Wallet");
const Transaction = require("../models/TransctionModel");
const ApiError = require("../utils/ApiError");

exports.getWallet = async (userId) => {
  const wallet = await Wallet.findOne({ userId });
  const transactions = await Transaction.find({ userId });
  return { wallet, transactions };
};

exports.addMoney = async (userId, amount) => {
  if (amount <= 0) throw new ApiError(400, "Invalid amount");

  const wallet = await Wallet.findOneAndUpdate(
    { userId },
    { $inc: { balance: amount } },
    { new: true }
  );

  await Transaction.create({
    userId,
    type: "CREDIT",
    amount,
  });

  return wallet;
};

exports.redeemMoney = async (userId, amount) => {
  const wallet = await Wallet.findOne({ userId });
  if (wallet.balance < amount) throw new ApiError(400, "Insufficient Balance");

  wallet.balance -= amount;
  await wallet.save();

  await Transaction.create({
    userId,
    type: "DEBIT",
    amount,
  });

  return wallet;
};
