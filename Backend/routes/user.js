import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = Router();

router.get("/signup", (_req, res) => {
  return res.json({
    success: false,
    message: "Use POST /user/signup with JSON { name, email, password }"
  });
});

router.get("/login", (_req, res) => {
  return res.json({
    success: false,
    message: "Use POST /user/login with JSON { email, password }"
  });
});

router.post("/signup", async (req, res) => {
  console.log("Signup API called");
  const { name, email, password } = req.body || {};
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }
  try {
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ success: false, message: "Email already registered" });
    }
    const hash = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hash });
    return res.status(201).json({ success: true, message: "User registered successfully" });
  } catch (e) {
    return res.status(500).json({ success: false, message: "Registration failed", detail: e.message });
  }
});

router.post("/login", async (req, res) => {
  console.log("Login API called");
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }
  try {
    const normalizedEmail = String(email).trim();
    const pattern = new RegExp(`^${normalizedEmail.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&")}$`, "i");
    const user = await User.findOne({ email: { $regex: pattern } });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not registered, please signup first" });
    }
    const ok = await bcrypt.compare(String(password), user.password);
    if (!ok) {
      return res.status(401).json({ success: false, message: "Invalid password" });
    }
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "devsecret",
      { expiresIn: "7d" }
    );
    return res
      .status(200)
      .json({
        success: true,
        message: "Login successful",
        token,
        user: { id: user._id, name: user.name, email: user.email }
      });
  } catch (e) {
    return res.status(500).json({ success: false, message: "Login failed" });
  }
});

export default router;
