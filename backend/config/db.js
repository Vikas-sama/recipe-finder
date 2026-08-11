import mongoose from "mongoose";

export async function connectDB() {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error(
      "MONGO_URI is not set. Copy backend/.env.example to backend/.env and fill it in."
    );
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    console.error(
      "If you're on JioFiber, make sure you're using the non-SRV connection string (see backend/.env.example)."
    );
    process.exit(1);
  }
}
