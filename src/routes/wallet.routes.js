const express = require("express");
const auth = require("../middlewares/auth.middleware");
const walletController = require("../controllers/wallet.controller");

const router = express.Router();

router.get("/", auth, walletController.getWallet);
router.post("/add-money", auth, walletController.addMoney);
router.post("/redeem", auth, walletController.redeemMoney);

module.exports = router;
