import mongoose from "mongoose";

const darshanSlotSchema = new mongoose.Schema(
  {
    templeId: { type: mongoose.Types.ObjectId, ref: "Temple", required: true, index: true },
    date: { type: String, required: true, index: true },           // YYYY-MM-DD
    startTime: { type: String, required: true },                    // e.g., "10:30 AM"
    endTime: { type: String, required: true },
    availableSeats: { type: Number, required: true, min: 0 },
    price: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

darshanSlotSchema.index({ templeId: 1, date: 1 });

export default mongoose.model("DarshanSlot", darshanSlotSchema);
