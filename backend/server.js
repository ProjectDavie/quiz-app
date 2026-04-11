const express = require("express");
const cors = require("cors");
const multer = require("multer");
const pdfParse = require("pdf-parse");

require("dotenv").config();
const connectDB = require("./config/db");

const { generateQuestions } = require("./utils/generateQuestions");
const { generateFlashcards } = require("./utils/generateFlashcards");

const app = express();

/* ========================
   CONNECT DATABASE
======================== */
connectDB();

/* ========================
   MIDDLEWARE
======================== */
app.use(cors({
  origin: "http://localhost:3000",
}));

app.use(express.json());

/* ========================
   MULTER CONFIG
======================== */
const upload = multer({
  storage: multer.memoryStorage(),
});

/* ========================
   HEALTH CHECK
======================== */
app.get("/", (req, res) => {
  res.json({ status: "server running" });
});

/* ========================
   UPLOAD + PROCESS PDF
======================== */
app.post("/upload", upload.single("pdf"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No PDF uploaded" });
    }

    const pdfData = await pdfParse(req.file.buffer);

    // Split pages
    const rawPages = pdfData.text.split(/\f/);

    const pages = rawPages
      .map((text, index) => {
        const cleaned = text.replace(/\s+/g, " ").trim();

        return {
          pageNumber: index + 1,
          text: cleaned,
        };
      })
      .filter((p) => p.text.length > 0);

    console.log("📄 Pages extracted:", pages.length);

    // Combine text
    const fullText = pages.map((p) => p.text).join(" ");

    // Generate content
    const questions = generateQuestions(fullText);
    const flashcards = generateFlashcards(fullText);

    console.log("❓ Questions:", questions.length);
    console.log("🧠 Flashcards:", flashcards.length);

    return res.json({
      success: true,
      pages,
      questions,
      flashcards,
    });

  } catch (err) {
    console.error("❌ Upload error:", err);

    return res.status(500).json({
      error: "Failed to process PDF",
    });
  }
});

/* ========================
   START SERVER
======================== */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});