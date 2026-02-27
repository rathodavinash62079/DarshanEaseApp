import { Router } from "express";
import { register, login } from "../controller/auth.controller.js";

const router = Router();
router.get("/login", (_req, res) => {
  res.json({ success: false, message: "Use POST /api/auth/login with JSON { email, password }" });
});
router.post("/register", register);
router.post("/login", login);
export default router;
