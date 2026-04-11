const express = require("express");
const router = express.Router();

const Document = require("../models/Document");

/* ========================
   GET ALL DOCUMENTS
======================== */
router.get("/", async (req, res) => {
  try {
    const documents = await Document.find()
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      documents,
    });

  } catch (err) {
    console.error("❌ Fetch documents error:", err);

    res.status(500).json({
      error: "Failed to fetch documents",
    });
  }
});

module.exports = router;