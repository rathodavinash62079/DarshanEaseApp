import express from "express";

const router = express.Router();

router.get("/tickets", (_req, res) => {
  return res.json({
    success: false,
    message: "Use POST /api/tickets with JSON to book a ticket"
  });
});

router.post("/tickets", (req, res) => {
  const {
    templeName,
    date,
    darshanTime,
    aartiTime,
    specialDarshan,
    price,
  } = req.body || {};
  return res.status(201).json({
    message: "Ticket booked successfully",
    data: {
      templeName,
      date,
      darshanTime,
      aartiTime,
      specialDarshan,
      price,
    },
  });
});

export default router;
