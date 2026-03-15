// backend/server.js

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const pdfParse = require("pdf-parse");

const app = express();
app.use(cors());
app.use(express.json());

/* Multer memory storage */
const upload = multer({
  storage: multer.memoryStorage(),
});

/* Test route */
app.get("/", (req, res) => {
  res.send("PDF Text Extraction Backend Running");
});

/* PDF Upload Route */
app.post("/upload", upload.single("pdf"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No PDF uploaded" });
    }

    console.log("Uploaded file:", req.file.originalname);

    // Parse PDF
    const pdfData = await pdfParse(req.file.buffer, { max: 0 });
    
    // pdfData.text contains all text, pdfData.numpages total pages
    const pages = pdfData.text.split(/\f/); // \f is page break in pdf-parse

    // Clean each page
    const cleanedPages = pages.map((pageText, index) => ({
      pageNumber: index + 1,
      text: pageText
        .replace(/|•|\*|[0-9]+\./g, "\n")  // replace bullets with newlines
        .replace(/\s+/g, " ")                 // normalize spaces
        .trim()
    }));

    res.json({
      success: true,
      pdfTitle: req.file.originalname,
      totalPages: pdfData.numpages,
      pages: cleanedPages
    });

  } catch (error) {
    console.error("PDF extraction error:", error);
    res.status(500).json({ error: "Failed to extract PDF text" });
  }
});

/* Start Server */
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});