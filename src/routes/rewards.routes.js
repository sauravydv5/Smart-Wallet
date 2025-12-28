const express = require("express");
const auth = require("../middlewares/auth.middleware");
const rewardsController = require("../controllers/rewards.controller");

const router = express.Router();

// Redeem voucher
router.post("/redeem/:voucherId", auth, rewardsController.redeemVoucher);

module.exports = router;
