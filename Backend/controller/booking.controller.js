import Booking from "../model/booking.model.js";
import DarshanSlot from "../model/darshanSlot.model.js";

export async function createBooking(req, res) {
  const { slotId, phone, fullName, email } = req.body || {};
  // Backward compatibility fields:
  const { temple, templeId, date, time, service, amount, paymentMethod, quantity = 1, convenienceFee = 0 } = req.body || {};
  try {
    let bookingPayload = {
      userId: req.user.id,
      phone,
      fullName: fullName || "",
      email: email || "",
      paymentMethod: paymentMethod ?? "Simulated",
      quantity: Math.max(1, Number(quantity) || 1),
      convenienceFee: Math.max(0, Number(convenienceFee) || 0),
    };

    if (slotId) {
      const slot = await DarshanSlot.findById(slotId).lean();
      if (!slot) return res.status(404).json({ error: "Slot not found" });
      // Atomically decrement availableSeats if > 0
      const updated = await DarshanSlot.findOneAndUpdate(
        { _id: slotId, availableSeats: { $gte: bookingPayload.quantity } },
        { $inc: { availableSeats: -bookingPayload.quantity } },
        { new: true }
      );
      if (!updated) return res.status(409).json({ error: "Slot full" });
      bookingPayload = {
        ...bookingPayload,
        temple: undefined,
        templeId: slot.templeId,
        date: slot.date,
        time: `${slot.startTime}-${slot.endTime}`,
        service: "Darshan",
        amount: slot.price,
        slotId: slotId,
      };
    } else {
      // Legacy booking path (without slot management)
      if (!temple || !date || !time || !phone || !service) {
        return res.status(400).json({ error: "Missing fields" });
      }
      bookingPayload = {
        ...bookingPayload,
        temple,
        templeId: templeId || null,
        date,
        time,
        service,
        amount: amount ?? 0,
      };
    }

    // Compute totalAmount = amount * quantity + convenienceFee
    const unit = Number(bookingPayload.amount ?? 0);
    const qty = Number(bookingPayload.quantity ?? 1);
    const fee = Number(bookingPayload.convenienceFee ?? 0);
    const total = unit * qty + fee;
    const booking = await Booking.create({ ...bookingPayload, totalAmount: total, bookingDate: new Date() });
    return res.status(201).json({ message: "Booking successful", booking });
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
