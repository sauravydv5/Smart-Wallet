exports.getWallet = async (req, res) => {
  res.json({
    message: "Wallet fetched successfully",
    user: req.user,
  });
};

exports.addMoney = async (req, res) => {
  const { amount } = req.body || {};

  if (!amount) {
    return res.status(400).json({
      success: false,
      message: "Amount is required",
    });
  }

  const { id, name, email } = req.user; // 🔥 JWT se

  res.status(200).json({
    success: true,
    message: "Money added successfully",
    data: {
      user: {
        id,
        name,
        email,
      },
      amount,
    },
  });
};

exports.redeemMoney = async (req, res) => {
  const { amount } = req.body;

  res.json({
    message: "Money redeemed successfully",
    amount,
    user: req.user,
  });
};
