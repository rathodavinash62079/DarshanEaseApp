import { Router } from "express";
import { listTemples, addTemple, updateTemple, deleteTemple } from "../controller/temple.controller.js";
import { auth } from "../middleware/auth.middleware.js";

const router = Router();
router.get("/", listTemples);
router.post("/", auth, addTemple);
router.put("/:id", auth, updateTemple);
router.delete("/:id", auth, deleteTemple);
export default router;

