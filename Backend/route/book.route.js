import { Router } from "express";
import { createBooking, getMyBookings } from "../controller/booking.controller.js";
import { auth } from "../middleware/auth.middleware.js";

const router = Router();
router.post("/", auth, createBooking);
router.get("/mybooking", auth, getMyBookings);
export default router;

