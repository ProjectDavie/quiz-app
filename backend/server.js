const express = require("express");
const cors = require("cors");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const { generateQuestions } = require("./utils/generateQuestions");

const app = express();

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
   HEALTH CHECK (optional but useful)
======================== */
app.get("/", (req, res) => {
  res.json({ status: "server running" });
});

/* ========================
   UPLOAD + EXTRACT + PAGES + QUESTIONS
======================== */
app.post("/upload", upload.single("pdf"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No PDF uploaded" });
  }

  try {
    const pdfData = await pdfParse(req.file.buffer);

    // 🔥 Split into pages
    const rawPages = pdfData.text.split(/\f/);

    const pages = rawPages.map((text, index) => {
      const cleaned = text.replace(/\s+/g, " ").trim();

      return {
        pageNumber: index + 1,
        text: cleaned,
      };
    }).filter(p => p.text.length > 0);

    console.log("📄 Pages extracted:", pages.length);

    // 🔥 Combine ALL pages into one text for question generation
    const fullText = pages.map(p => p.text).join(" ");

    // 🔥 Generate questions
    const questions = generateQuestions(fullText);

    console.log("❓ Questions generated:", questions.length);

    // ✅ RETURN EVERYTHING FRONTEND NEEDS
    return res.json({
      success: true,
      pages,
      questions,
    });

  } catch (err) {
    console.error("❌ Upload error:", err);

    return res.status(500).json({
      error: "Failed to process PDF",
    });
  }
});

/* ========================
   GENERATE QUESTIONS (optional standalone route)
======================== */
app.post("/generate-questions", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "No text provided" });
  }

  try {
    const questions = generateQuestions(text);

    return res.json({
      success: true,
      questions,
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error: "Failed to generate questions",
    });
  }
});

/* ========================
   START SERVER
======================== */
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});