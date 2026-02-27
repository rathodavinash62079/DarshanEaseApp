import express from "express";
import DarshanSlot from "../model/darshanSlot.model.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create slot for a temple
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { templeId, date, startTime, endTime, availableSeats, price } = req.body || {};
    if (!templeId || !date || !startTime || !endTime || availableSeats == null || price == null) {
      return res.status(400).json({ error: "Missing fields" });
    }
    const slot = await DarshanSlot.create({ templeId, date, startTime, endTime, availableSeats, price });
    return res.status(201).json({ slot });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

// List slots by temple/date
router.get("/", async (req, res) => {
  const { templeId, date } = req.query;
  const filter = {};
  if (templeId) filter.templeId = templeId;
  if (date) filter.date = date;
  const list = await DarshanSlot.find(filter).sort({ date: 1 }).lean();
  return res.json(list);
});

// Get single slot by id
router.get("/:id", async (req, res) => {
  try {
    const one = await DarshanSlot.findById(req.params.id).lean();
    if (!one) return res.status(404).json({ error: "Slot not found" });
    return res.json(one);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

export default router;
