import jwt from "jsonwebtoken";
import User from "../models/User.js";
import fs from "fs";
import path from "path";

const SECRET = process.env.JWT_SECRET || "secret123";

export async function register(req, res) {
  try {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password) return res.status(400).json({ message: "Missing fields" });
    const exists = await User.findOne({ email: new RegExp(`^${String(email).trim().replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&")}$`, "i") });
    if (exists) return res.status(409).json({ message: "Email already registered" });
    const user = await User.create({ name, email, password });
    try {
      const p = path.resolve(process.cwd(), "users.json");
      let arr = [];
      try {
        const raw = fs.readFileSync(p, "utf8");
        arr = Array.isArray(JSON.parse(raw)) ? JSON.parse(raw) : [];
      } catch {}
      arr.push({ id: String(user._id), name: user.name, email: user.email, createdAt: new Date().toISOString() });
      fs.writeFileSync(p, JSON.stringify(arr, null, 2));
    } catch {}
    const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "1d" });
    return res.status(201).json({ message: "Registration successful", token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (e) {
    return res.status(500).json({ message: e.message || "Registration failed" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ message: "Email and password are required" });
    const pattern = new RegExp(`^${String(email).trim().replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&")}$`, "i");
    const user = await User.findOne({ email: { $regex: pattern } });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });
    const ok = await user.comparePassword(String(password));
    if (!ok) return res.status(400).json({ message: "Invalid email or password" });
    const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "1d" });
    return res.json({ message: "Login successful", token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (e) {
    return res.status(500).json({ message: e.message || "Internal server error" });
  }
}
