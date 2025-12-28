const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const logger = require("./middlewares/logger.middleware");
const errorHandler = require("./middlewares/error.middleware");

const authRoutes = require("./routes/auth.routes");
const walletRoutes = require("./routes/wallet.routes");
const rewardRoutes = require("./routes/rewards.routes");

const app = express();

/* ---------- MIDDLEWARES (ORDER MATTERS) ---------- */
app.use(express.json());
app.use(cookieParser());

app.use(cors());

app.use(logger);

/* ---------- ROUTES ---------- */
app.use("/auth", authRoutes);
app.use("/wallet", walletRoutes);
app.use("/rewards", rewardRoutes);

/* ---------- ERROR HANDLER (LAST) ---------- */
app.use(errorHandler);

module.exports = app;
