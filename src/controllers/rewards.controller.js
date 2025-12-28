const Voucher = require("../models/Voucher");
const Wallet = require("../models/Wallet");

exports.redeemVoucher = async (req, res) => {
  try {
    const userId = req.user.id; // JWT se
    const voucherId = req.params.id;

    const voucher = await Voucher.findById(voucherId);
    if (!voucher || !voucher.isActive) {
      return res.status(400).json({
        success: false,
        message: "Invalid or inactive voucher",
      });
    }

    let wallet = await Wallet.findOne({ userId });

    // ✅ wallet nahi mila → create
    if (!wallet) {
      wallet = new Wallet({
        userId,
        balance: 0,
      });
    }

    wallet.balance += voucher.value;
    await wallet.save();

    voucher.isActive = false;
    await voucher.save();

    res.json({
      success: true,
      message: "Voucher redeemed successfully",
      balance: wallet.balance,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
