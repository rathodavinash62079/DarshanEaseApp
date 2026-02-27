import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

export async function register(req, res) {
  const { name, email, password } = req.body || {};
  if (!name || !email || !password) return res.status(400).json({ error: "Missing fields" });
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ error: "Email already registered" });
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });
    const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET || "devsecret", { expiresIn: "7d" });
    return res.json({ token, user: { id: user._id, name, email } });
  } catch (e) {
    return res.status(500).json({ error: "Registration failed", detail: e.message });
  }
}

export async function login(req, res) {
  const { email, password, checkAlreadyRegistered, mode } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }
  try {
    const normalizedEmail = String(email).trim();
    const pattern = new RegExp(`^${normalizedEmail.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i");
    const user = await User.findOne({ email: { $regex: pattern } });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not registered, please signup first" });
    }
    const ok = await bcrypt.compare(String(password), user.password);
    if (!ok) {
      return res.status(401).json({ success: false, message: "Invalid password" });
    }
    if (checkAlreadyRegistered === true || mode === "check") {
      return res.status(409).json({ success: false, message: "User already registered, please login" });
    }
    const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET || "devsecret", { expiresIn: "7d" });
    return res.status(200).json({ success: true, message: "Login successful", token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (e) {
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}
