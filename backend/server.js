const express = require("express");
const cors = require("cors");
const multer = require("multer");
const PDFParser = require("pdf2json");
const { generateQuestions } = require("./utils/generateQuestions");

const app = express();

app.use(cors());
app.use(express.json());

/* Multer memory storage */
const upload = multer({
  storage: multer.memoryStorage(),
});

/* TEST ROUTE */
app.get("/", (req, res) => {
  res.send("PDF Quiz Backend Running");
});

/* PDF UPLOAD ROUTE */
app.post("/upload", upload.single("pdf"), async (req, res) => {

  try {

    if (!req.file) {
      return res.status(400).json({
        error: "No PDF uploaded"
      });
    }

    console.log("Uploaded file:", req.file.originalname);

    const pdfParser = new PDFParser();

    pdfParser.on("pdfParser_dataError", errData => {
      console.error(errData.parserError);
      res.status(500).json({ error: "PDF parsing error" });
    });

    pdfParser.on("pdfParser_dataReady", pdfData => {

      let text = "";

      pdfData.Pages.forEach(page => {
        page.Texts.forEach(textItem => {
          text += decodeURIComponent(textItem.R[0].T) + " ";
        });
      });

      console.log("PDF text extracted");

      const questions = generateQuestions(text);

      res.json({
        success: true,
        questions: questions
      });

    });

    pdfParser.parseBuffer(req.file.buffer);

  } catch (error) {

    console.error("Processing error:", error);

    res.status(500).json({
      error: "Failed to process PDF"
    });

  }

});

/* START SERVER */

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});