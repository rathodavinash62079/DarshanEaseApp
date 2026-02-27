import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();

const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/darshanease";
const dbName = process.env.MONGO_DB || "darshanease";

const userSchema = new mongoose.Schema(
  { name: String, email: { type: String, unique: true }, password: String },
  { timestamps: true }
);

const templeSchema = new mongoose.Schema(
  { name: String, location: String, image: String, description: String },
  { timestamps: true }
);

async function main() {
  await mongoose.connect(uri, { dbName });
  const User = mongoose.model("User", userSchema);
  const Temple = mongoose.model("Temple", templeSchema);

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

  await Temple.deleteMany({});
  await Temple.insertMany(temples);

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
