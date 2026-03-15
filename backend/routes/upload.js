const express = require("express");
const multer = require("multer");

const extractText = require("../utils/extractText");
const { generateQuestions } = require("../utils/generateQuestions");
const { generateFlashcards } = require("../utils/generateFlashcards");

const router = express.Router();

/* Multer memory storage */
const upload = multer({
  storage: multer.memoryStorage(),
});

/* Upload PDF */
router.post("/upload", upload.single("pdf"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: "No PDF uploaded",
      });
    }

    console.log("Uploaded:", req.file.originalname);

    /* Extract text using pdf-parse */
    const text = await extractText(req.file.buffer);

    /* Generate quizzes */
    const questions = generateQuestions(text);

    /* Generate flashcards */
    const flashcards = generateFlashcards(text);

    res.json({
      success: true,
      text,
      questions,
      flashcards,
    });

  } catch (error) {
    console.error("Upload error:", error);

    res.status(500).json({
      error: "Failed to process PDF",
    });
  }
});

module.exports = router;