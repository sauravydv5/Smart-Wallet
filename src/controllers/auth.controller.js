const authService = require("../services/auth.service");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  try {
    const user = await authService.signup(req.body);
    res.status(201).json({ success: true, user });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res) => {
  const { email } = req.body;

  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  // ✅ COOKIE SET
  res.cookie("token", token, {
    httpOnly: true, // security
    secure: false, // true only for https
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  res.status(200).json({
    message: "Login successful",
  });
};
