const express = require("express");
const multer = require("multer");

const extractText = require("../utils/extractText");
const { generateQuestions } = require("../utils/generateQuestions");
const { generateFlashcards } = require("../utils/generateFlashcards");

const Document = require("../models/Document");

const router = express.Router();

/* ========================
   MULTER CONFIG
======================== */
const upload = multer({
  storage: multer.memoryStorage(),
});

/* ========================
   UPLOAD PDF ROUTE
======================== */
router.post("/upload", upload.single("pdf"), async (req, res) => {
  try {
    // 1. Validate file
    if (!req.file) {
      return res.status(400).json({
        error: "No PDF uploaded",
      });
    }

    console.log("📄 Uploaded:", req.file.originalname);

    // 2. Extract text from PDF
    const text = await extractText(req.file.buffer);

    // 3. Generate learning content
    const questions = generateQuestions(text);
    const flashcards = generateFlashcards(text);

    console.log("❓ Questions generated:", questions.length);
    console.log("🧠 Flashcards generated:", flashcards.length);

    // 4. Save EVERYTHING to MongoDB
    const savedDocument = await Document.create({
      title: req.file.originalname,
      pages: [
        {
          pageNumber: 1,
          text,
        },
      ],
      questions,
      flashcards,
    });

    console.log("💾 Saved document:", savedDocument._id);

    // 5. Return ONLY documentId (clean API design)
    return res.json({
      success: true,
      documentId: savedDocument._id,
    });

  } catch (error) {
    console.error("❌ Upload error:", error);

    return res.status(500).json({
      error: "Failed to process PDF",
    });
  }
});

module.exports = router;