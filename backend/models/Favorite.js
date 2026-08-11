import mongoose from "mongoose";

// No user accounts in this app — each browser gets a random "clientId"
// (generated on the frontend and stored in localStorage) so favorites
// stay separate per device without requiring login.
const favoriteSchema = new mongoose.Schema(
  {
    clientId: { type: String, required: true, index: true },
    mealId: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String },
    category: { type: String },
    area: { type: String },
  },
  { timestamps: true }
);

// A given browser can only favorite the same recipe once.
favoriteSchema.index({ clientId: 1, mealId: 1 }, { unique: true });

export default mongoose.model("Favorite", favoriteSchema);
