import { Router } from "express";
import { register, login } from "../controllers/userController.js";

const router = Router();
router.get("/ping", (_req, res) => res.json({ pong: true }));
router.post("/register", register);
router.post("/login", login);
router.post("/signup", register);
router.post("/signin", login);
export default router;
