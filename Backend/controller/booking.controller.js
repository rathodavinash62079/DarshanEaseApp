import Booking from "../model/booking.model.js";

export async function createBooking(req, res) {
  const { temple, templeId, date, time, phone, service, amount, paymentMethod, fullName, email } = req.body || {};
  if (!temple || !date || !time || !phone || !service) {
    return res.status(400).json({ error: "Missing fields" });
  }
  try {
    const booking = await Booking.create({
      userId: req.user.id,
      temple,
      templeId: templeId || null,
      date,
      time,
      phone,
      service,
      amount: amount ?? 0,
      paymentMethod: paymentMethod ?? "Simulated",
      fullName: fullName || "",
      email: email || "",
    });
    return res.status(201).json({ booking });
  } catch (e) {
    return res.status(500).json({ error: "Booking failed", detail: e.message });
  }
}

export async function getMyBookings(req, res) {
  try {
    const list = await Booking.find({ userId: req.user.id }).lean();
    return res.json(list);
  } catch (e) {
    return res.status(500).json({ error: "Fetch failed", detail: e.message });
  }
}

