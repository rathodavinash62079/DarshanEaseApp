import { Router } from "express";
import { createBooking, getMyBookings } from "../controller/booking.controller.js";
import { auth } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", (_req, res) => {
  res.json({ success: false, message: "Use POST /api/book with JSON body to create booking" });
});

router.post("/", auth, async (req, res, next) => {
  console.log("Booking API called");
  return createBooking(req, res, next);
});

router.get("/mybooking", auth, getMyBookings);

export default router;
