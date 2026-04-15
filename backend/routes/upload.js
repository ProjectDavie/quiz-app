const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");

const Document = require("../models/Document");

const { generateQuestions } = require("../utils/generateQuestions");
const { generateFlashcards } = require("../utils/generateFlashcards");
const { generateTopics } = require("../utils/generateTopics");

const { generateAIQuestions } = require("../utils/ai/generateAIQuestions");
const { generateAIFlashcards } = require("../utils/ai/generateAIFlashcards");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

/**
 * UPLOAD PDF
 */
router.post("/upload", upload.single("pdf"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No PDF uploaded" });
    }

    const aiMode = req.body.aiMode === "true";

    const pdfData = await pdfParse(req.file.buffer);

    // split pages
    const rawPages = pdfData.text.split(/\f/);

    const pages = rawPages
      .map((text, index) => ({
        pageNumber: index + 1,
        text: text.replace(/\s+/g, " ").trim(),
      }))
      .filter((p) => p.text.length > 0);

    console.log("TYPE OF PAGES:", typeof pages);
    console.log("IS ARRAY:", Array.isArray(pages));
    console.log("PAGES SAMPLE:", pages?.[0]);

    let questions = [];
    let flashcards = [];

    // =========================
    // 🔵 AI MODE (PAGE BASED)
    // =========================
    if (aiMode) {
      for (const page of pages) {
        const q = await generateAIQuestions(
          page.text,
          page.pageNumber
        );

        const f = await generateAIFlashcards(
          page.text,
          page.pageNumber
        );

        questions.push(...q);
        flashcards.push(...f);
      }
    }

    // =========================
    // 🟢 OFFLINE MODE
    // =========================
    else {
      questions = generateQuestions(pages);
      flashcards = generateFlashcards(pages);
      const topics = generateTopics(pages);
    }

    // =========================
    // SAVE TO DATABASE
    // =========================
    const doc = await Document.create({
      title: req.file.originalname,
      mode: aiMode ? "ai" : "offline",
      pages,
      questions,
      flashcards,
    });

    return res.json({
      success: true,
      documentId: doc._id,
      questions,
      flashcards,
      mode: doc.mode,
    });
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    return res.status(500).json({
      error: "Failed to process PDF",
    });
  }
});

module.exports = router;