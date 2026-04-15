const express = require("express");
const multer = require("multer");

const extractText = require("../utils/extractText");
const { generateQuestions } = require("../utils/generateQuestions");
const { generateFlashcards } = require("../utils/generateFlashcards");

const Document = require("../models/Document");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

function createSlug(title) {
  return title
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\.[^/.]+$/, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/* ========================
   UPLOAD PDF
======================== */
router.post("/upload", upload.single("pdf"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log("📄 Upload:", req.file.originalname);

    const text = await extractText(req.file.buffer);

    const questions = generateQuestions(text);
    const flashcards = generateFlashcards(text);

    const slugBase = createSlug(req.file.originalname);
    let slug = slugBase || "project";
    let suffix = 1;

    while (await Document.exists({ slug })) {
      slug = `${slugBase}-${suffix++}`;
    }

    const saved = await Document.create({
      title: req.file.originalname,
      slug,
      pages: [{ pageNumber: 1, text }],
      questions,
      flashcards,
    });

    console.log("💾 Saved:", saved._id);

    res.json({
      success: true,
      documentId: saved._id,
    });

  } catch (err) {
    console.error("❌ Upload error:", err);

    res.status(500).json({
      error: "Upload failed",
    });
  }
});

module.exports = router;