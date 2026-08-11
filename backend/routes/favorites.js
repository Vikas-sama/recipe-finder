import express from "express";
import Favorite from "../models/Favorite.js";

const router = express.Router();

// GET /api/favorites?clientId=xxxx
// Returns all favorites saved by this browser.
router.get("/", async (req, res) => {
  const { clientId } = req.query;
  if (!clientId) return res.status(400).json({ message: "clientId is required" });

  try {
    const favorites = await Favorite.find({ clientId }).sort({ createdAt: -1 });
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ message: "Could not load favorites", error: err.message });
  }
});

// POST /api/favorites
// Body: { clientId, mealId, name, image, category, area }
router.post("/", async (req, res) => {
  const { clientId, mealId, name, image, category, area } = req.body;
  if (!clientId || !mealId || !name) {
    return res.status(400).json({ message: "clientId, mealId, and name are required" });
  }

  try {
    const favorite = await Favorite.findOneAndUpdate(
      { clientId, mealId },
      { clientId, mealId, name, image, category, area },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    res.status(201).json(favorite);
  } catch (err) {
    res.status(500).json({ message: "Could not save favorite", error: err.message });
  }
});

// DELETE /api/favorites/:mealId?clientId=xxxx
router.delete("/:mealId", async (req, res) => {
  const { clientId } = req.query;
  const { mealId } = req.params;
  if (!clientId) return res.status(400).json({ message: "clientId is required" });

  try {
    await Favorite.findOneAndDelete({ clientId, mealId });
    res.json({ message: "Removed from favorites" });
  } catch (err) {
    res.status(500).json({ message: "Could not remove favorite", error: err.message });
  }
});

export default router;
