import express from "express";
import { generateShayari } from "../services/aiServices.js";

const router = express.Router();

router.post("/generate-shayari", async (req, res) => {
  try {

    const { mood } = req.body;

    if (!mood) {
      return res.status(400).json({
        message: "Mood is required"
      });
    }

    const shayari = await generateShayari(mood);

    res.json({
      shayari
    });

  } catch (error) {
    console.error("AI Error:", error);

    res.status(500).json({
      message: "Failed to generate shayari"
    });
  }
});

export default router;