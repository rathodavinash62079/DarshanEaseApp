import mongoose from "mongoose";

const URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/darshanease";
const DB_NAME = process.env.MONGO_DB || "darshanease";

export default async function connectDB() {
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(URI, {
    dbName: DB_NAME,
    directConnection: true,
    serverSelectionTimeoutMS: 10000
  });
}
