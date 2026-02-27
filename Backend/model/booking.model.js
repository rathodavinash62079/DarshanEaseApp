import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    templeId: { type: mongoose.Types.ObjectId, ref: "Temple", required: false },
    slotId: { type: mongoose.Types.ObjectId, ref: "DarshanSlot", required: false },
    temple: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    phone: { type: String, required: true },
    service: { type: String, required: true },
    quantity: { type: Number, default: 1, min: 1 },
    fullName: { type: String, default: "" },
    email: { type: String, default: "" },
    amount: { type: Number, default: 0 },
    totalAmount: { type: Number, default: 0 },
    convenienceFee: { type: Number, default: 0 },
    bookingDate: { type: Date, default: () => new Date() },
    paymentMethod: { type: String, default: "Simulated" },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
