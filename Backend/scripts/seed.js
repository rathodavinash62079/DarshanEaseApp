import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";
import User from "../model/user.model.js";
import Temple from "../model/temple.model.js";
import DarshanSlot from "../model/darshanSlot.model.js";
import Booking from "../model/booking.model.js";

dotenv.config();

const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/darshanease";
const dbName = process.env.MONGO_DB || "darshanease";

function readJsonArray(filePath) {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    const json = JSON.parse(data);
    return Array.isArray(json) ? json : [];
  } catch {
    return [];
  }
}

function asObjectId(v) {
  try {
    if (!v) return undefined;
    if (typeof v === "string" && /^[a-fA-F0-9]{24}$/.test(v)) return new mongoose.Types.ObjectId(v);
    if (typeof v === "object" && v.$oid && /^[a-fA-F0-9]{24}$/.test(v.$oid)) return new mongoose.Types.ObjectId(v.$oid);
  } catch {}
  return undefined;
}

async function upsertUsers(arr) {
  for (const u of arr) {
    if (!u?.email) continue;
    const doc = {
      name: String(u.name || "").trim() || "User",
      email: String(u.email).trim(),
      password: u.password || "Passw0rd123"
    };
    await User.updateOne(
      { email: new RegExp(`^${doc.email.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&")}$`, "i") },
      { $setOnInsert: doc },
      { upsert: true }
    );
  }
}

async function upsertTemples(arr) {
  for (const t of arr) {
    if (!t?.name) continue;
    const doc = {
      name: String(t.name).trim(),
      location: t.location || "",
      image: t.image || "",
      description: t.description || ""
    };
    await Temple.updateOne(
      { name: new RegExp(`^${doc.name.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&")}$`, "i") },
      { $set: doc },
      { upsert: true }
    );
  }
}

async function upsertSlots(arr) {
  for (const s of arr) {
    const date = s?.date;
    const startTime = s?.startTime;
    const endTime = s?.endTime;
    let templeId = s?.templeId;
    if (!templeId && s?.templeName) {
      const t = await Temple.findOne({ name: new RegExp(`^${String(s.templeName).replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&")}$`, "i") });
      if (t) templeId = t._id;
    }
    if (!templeId || !date || !startTime || !endTime) continue;
    const doc = {
      templeId,
      date,
      startTime,
      endTime,
      availableSeats: Number(s.availableSeats ?? 0),
      price: Number(s.price ?? 0)
    };
    const key = { templeId, date, startTime, endTime };
    await DarshanSlot.updateOne(key, { $set: doc }, { upsert: true });
  }
}

async function upsertBookings(arr) {
  for (const b of arr) {
    let userId = asObjectId(b?.userId) || undefined;
    if (!userId && b?.email) {
      const u = await User.findOne({ email: new RegExp(`^${String(b.email).replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&")}$`, "i") });
      if (u) userId = u._id;
    }
    let templeId = asObjectId(b?.templeId) || undefined;
    if (!templeId && b?.temple) {
      const t = await Temple.findOne({ name: new RegExp(`^${String(b.temple).replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&")}$`, "i") });
      if (t) templeId = t._id;
    }
    if (!b?.temple && !templeId) continue;
    const doc = {
      userId: userId || undefined,
      templeId: templeId || undefined,
      slotId: asObjectId(b?.slotId) || undefined,
      temple: b?.temple || undefined,
      date: b?.date,
      time: b?.time,
      phone: b?.phone,
      service: b?.service,
      quantity: Number(b?.quantity ?? 1),
      fullName: b?.fullName || "",
      email: b?.email || "",
      amount: Number(b?.amount ?? 0),
      convenienceFee: Number(b?.convenienceFee ?? 0),
      totalAmount: Number(b?.totalAmount ?? (Number(b?.amount ?? 0) * Number(b?.quantity ?? 1) + Number(b?.convenienceFee ?? 0))),
      paymentMethod: b?.paymentMethod || "Simulated",
      bookingDate: b?.bookingDate ? new Date(b.bookingDate) : new Date()
    };
    const key = {
      userId: doc.userId || null,
      temple: doc.temple || "",
      date: doc.date || "",
      time: doc.time || "",
      phone: doc.phone || "",
      service: doc.service || ""
    };
    await Booking.updateOne(key, { $setOnInsert: doc }, { upsert: true });
  }
}

async function main() {
  await mongoose.connect(uri, { dbName });

  const temples = [
    { name: "Kedarnath Temple", location: "Uttarakhand", image: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a", description: "Hindu temple dedicated to Lord Shiva." },
    { name: "Badrinath Temple", location: "Uttarakhand", image: "https://images.unsplash.com/photo-1627894483216-2138af692e32", description: "Dedicated to Lord Vishnu." },
    { name: "Tirupati Balaji", location: "Andhra Pradesh", image: "https://images.unsplash.com/photo-1615378539073-8c0b3b5b7e33", description: "Temple dedicated to Venkateswara." },
    { name: "Golden Temple", location: "Amritsar", image: "https://images.unsplash.com/photo-1589308078054-8321c87b7d9e", description: "Harmandir Sahib." },
    { name: "Somnath Temple", location: "Gujarat", image: "https://images.unsplash.com/photo-1625047509248-ec889cbff17f", description: "Jyotirlinga shrine of Shiva." },
    { name: "Meenakshi Temple", location: "Tamil Nadu", image: "https://images.unsplash.com/photo-1567591377721-c011a89f5dcb", description: "Temple in Madurai." },
    { name: "Kashi Vishwanath", location: "Varanasi", image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc", description: "Shiva temple on the Ganges." },
    { name: "Jagannath Temple", location: "Odisha", image: "https://images.unsplash.com/photo-1623056615172-3b6cce6b1f7f", description: "Temple of Jagannath in Puri." },
    { name: "Rameshwaram Temple", location: "Tamil Nadu", image: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272", description: "Ramanathaswamy Temple." },
    { name: "Vaishno Devi", location: "Jammu", image: "https://images.unsplash.com/photo-1605640840605-14ac1855827b", description: "Mata Vaishno Devi." },
    { name: "Mahakaleshwar", location: "Ujjain", image: "https://images.unsplash.com/photo-1623841930606-67e2bce48b78", description: "Jyotirlinga." },
    { name: "Shirdi Sai Baba", location: "Maharashtra", image: "https://images.unsplash.com/photo-1614145121029-83a9f7b68bf4", description: "Sai Baba temple." },
    { name: "Siddhivinayak", location: "Mumbai", image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a", description: "Ganesha temple." },
    { name: "Iskcon Temple", location: "Bangalore", image: "https://images.unsplash.com/photo-1627894482768-90d65d7d7c40", description: "ISKCON complex." },
    { name: "Akshardham", location: "Delhi", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220", description: "Temple complex." },
    { name: "Lotus Temple", location: "Delhi", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b", description: "Baháʼí House." },
    { name: "Konark Sun Temple", location: "Odisha", image: "https://images.unsplash.com/photo-1606298855672-3efb63017be8", description: "Sun temple." },
    { name: "Dwarkadhish Temple", location: "Gujarat", image: "https://images.unsplash.com/photo-1583267746897-2cf415887172", description: "Krishna temple in Dwarka." },
    { name: "Padmanabhaswamy", location: "Kerala", image: "https://images.unsplash.com/photo-1615484477778-ca3b77940c25", description: "Vishnu temple." }
  ];

  const dataDir = path.resolve(process.cwd(), "data");
  const usersFile = path.join(dataDir, "users.json");
  const templesFile = path.join(dataDir, "temples.json");
  const slotsFile = path.join(dataDir, "darshanslots.json");
  const bookingsFile = path.join(dataDir, "bookings.json");

  await upsertTemples(temples);
  await upsertTemples(readJsonArray(templesFile));
  await upsertUsers(readJsonArray(usersFile));
  await upsertSlots(readJsonArray(slotsFile));
  await upsertBookings(readJsonArray(bookingsFile));

  const adminEmail = "admin@darshanease.local";
  const adminExists = await User.findOne({ email: adminEmail });
  if (!adminExists) {
    const hash = await bcrypt.hash("admin123", 10);
    await User.create({ name: "Admin", email: adminEmail, password: hash });
  }

  await mongoose.disconnect();
  console.log("Seed completed");
  process.exit(0);
}

main().catch(async (e) => {
  console.error(e.message);
  try { await mongoose.disconnect(); } catch {}
  process.exit(1);
});
