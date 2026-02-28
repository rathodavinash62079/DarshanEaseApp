import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
import fs from "fs";
import path from "path";

export async function register(req, res) {
  const { name, email, password } = req.body || {};
  if (!name || !email || !password) return res.status(400).json({ error: "Missing fields" });
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ error: "Email already registered" });
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
    const escaped = normalizedEmail.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pattern = new RegExp(`^${escaped}$`, "i");
    const user = await User.findOne({ email: { $regex: pattern } });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not registered, please signup first" });
    }
    const rawPass = String(password);
    const stored = String(user.password || "");
    let ok = false;
    // Support legacy/plain-text passwords imported from JSON
    const isBcrypt = /^\$2[aby]\$/.test(stored);
    if (isBcrypt) {
      try {
        ok = await bcrypt.compare(rawPass, stored);
      } catch (cmpErr) {
        console.error("Login error: bcrypt compare failed");
        ok = false;
      }
    } else {
      ok = stored.length > 0 && stored === rawPass;
      // If plain text matched, upgrade hash in background
      if (ok) {
        try {
          const hash = await bcrypt.hash(rawPass, 10);
          user.password = hash;
          await user.save();
        } catch (_) { /* silent */ }
      }
    }
    if (!ok) {
      return res.status(401).json({ success: false, message: "Invalid password" });
    }
    if (checkAlreadyRegistered === true || mode === "check") {
      return res.status(409).json({ success: false, message: "User already registered, please login" });
    }
    const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET || "devsecret", { expiresIn: "7d" });
    return res.status(200).json({ success: true, message: "Login successful", token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (e) {
    console.error("Login error:", e.message);
    return res.status(500).json({ success: false, message: e.message || "Internal server error" });
  }
}
