const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Wallet = require("../models/Wallet");
const ApiError = require("../utils/ApiError");

exports.signup = async ({ name, email, phone, password }) => {
  if (!email || !password) {
    throw new ApiError(400, "Email & password required");
  }

  const existing = await User.findOne({ email });
  if (existing) {
    throw new ApiError(400, "Email already exists");
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    phone,
    password: hashed,
  });

  // 🔥 Wallet auto-create on signup
  await Wallet.create({ userId: user._id, balance: 0 });

  return user;
};

exports.login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new ApiError(401, "Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new ApiError(401, "Invalid credentials");

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return { token, userId: user._id };
};
