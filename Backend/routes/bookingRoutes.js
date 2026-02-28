import express from "express";
import Booking from "../models/Booking.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/book", authMiddleware, async (req, res) => {
  try {
    const body = req.body || {};
    const booking = new Booking({
      ...body,
      userId: req.user?.id || req.user?._id || body.userId,
      bookingDate: body.bookingDate ? new Date(body.bookingDate) : new Date(),
    });
    await booking.save();
    res.status(201).json({ message: "Booking successful", booking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/book/my", authMiddleware, async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const list = await Booking.find({ userId }).sort({ createdAt: -1 }).lean();
    res.json(list);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/book/mybooking", authMiddleware, async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const list = await Booking.find({ userId }).sort({ createdAt: -1 }).lean();
    res.json(list);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/book", authMiddleware, async (_req, res) => {
  try {
    const list = await Booking.find({}).sort({ createdAt: -1 }).lean();
    res.json(list);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/book/:id", authMiddleware, async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Booking.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "Booking not found" });
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
