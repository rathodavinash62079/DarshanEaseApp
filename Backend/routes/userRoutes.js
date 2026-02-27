import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  const token = jwt.sign({ id: user._id }, "secret123", { expiresIn: "1d" });
  res.json({ message: "Login successful", token });
});

export default router;
