import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouter from "./route/auth.route.js";
import templeRouter from "./route/temple.route.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import slotRoutes from "./routes/slot.route.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import Temple from "./model/temple.model.js";
import userRouter from "./routes/user.js";
import connectDB from "./config/db.js";
import { register as registerCtrl, login as loginCtrl } from "./controllers/userController.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/darshanease";

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

let serverStarted = false;
function startServerOnce() {
  if (serverStarted) return;
  serverStarted = true;
  app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}`);
  });
}

mongoose.connection.on("connecting", () => console.log("Mongo connecting..."));
mongoose.connection.on("connected", () => console.log("Mongo connection state: connected"));
mongoose.connection.on("disconnected", () => console.log("Mongo connection state: disconnected"));
mongoose.connection.on("error", (err) => console.error("Mongo connection error:", err.message));

async function connectMongo() {
  const dbName = process.env.MONGO_DB || "darshanease";
  await connectDB();
  const masked = MONGO_URI.includes("@")
    ? MONGO_URI.split("@")[1]
    : MONGO_URI.replace(/\/\/([^/]+)\/?.*$/, "//$1");
  console.log("MongoDB is connected");
  console.log(`Mongo connected -> ${masked} db=${dbName}`);
  const count = await Temple.countDocuments();
  if (count === 0) {
    await Temple.insertMany([
      { name: "Kedarnath Temple", location: "Uttarakhand", image: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a" },
      { name: "Badrinath Temple", location: "Uttarakhand", image: "https://images.unsplash.com/photo-1627894483216-2138af692e32" },
      { name: "Tirupati Balaji", location: "Andhra Pradesh", image: "https://images.unsplash.com/photo-1615378539073-8c0b3b5b7e33" },
    ]);
    console.log("Seeded default temples");
  }
  startServerOnce();
}
function startMongoRetry(delayMs = 5000) {
  connectMongo().catch((e) => {
    console.error("Mongo error:", e.message);
    setTimeout(() => startMongoRetry(Math.min(delayMs * 1.5, 30000)), delayMs);
  });
}
startMongoRetry();

app.get("/health/db", (_req, res) => {
  const state = mongoose.connection.readyState;
  res.json({ ok: state === 1, state });
});

app.use("/api/auth", authRouter);
app.use("/api/temples", templeRouter);
app.use("/api", bookingRoutes);
app.use("/api/users", userRoutes);
app.post("/api/users/register", registerCtrl);
app.post("/api/users/login", loginCtrl);
app.post("/api/users/signup", registerCtrl);
app.post("/api/users/signin", loginCtrl);
app.get("/api/users/ping", (_req, res) => res.json({ pong: true }));
app.use("/api/slots", slotRoutes);
app.use("/api", ticketRoutes);
app.use("/user", userRouter);

app.get("/", (_req, res) => res.send("Darshan Ease API running"));

// Global error handler for invalid JSON and other errors
app.use((err, _req, res, _next) => {
  const isJsonParse =
    err?.type === "entity.parse.failed" ||
    (err instanceof SyntaxError && "body" in err);
  if (isJsonParse) {
    return res.status(400).json({ success: false, message: "Invalid JSON in request body" });
  }
  return res.status(500).json({ success: false, message: "Internal server error" });
});
