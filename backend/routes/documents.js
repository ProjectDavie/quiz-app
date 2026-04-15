const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Document = require("../models/Document");

/* ========================
   GET ALL PROJECTS
======================== */
router.get("/", async (req, res) => {
  try {
    const documents = await Document.find().sort({ createdAt: -1 });

    return res.json({
      success: true,
      documents,
    });

  } catch (err) {
    console.error("❌ Fetch error:", err);

    return res.status(500).json({
      error: "Failed to fetch documents",
    });
  }
});

router.get("/:identifier", async (req, res) => {
  try {
    const { identifier } = req.params;
    let doc = null;

    if (mongoose.isValidObjectId(identifier)) {
      doc = await Document.findById(identifier);
    }

    if (!doc) {
      doc = await Document.findOne({ slug: identifier });
    }

    if (!doc) {
      return res.status(404).json({ error: "Document not found" });
    }

    res.json({ success: true, document: doc });

  } catch (err) {
    res.status(500).json({ error: "Failed to fetch document" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Document.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Document not found" });
    }

    res.json({
      success: true,
      message: "Document deleted permanently",
    });

  } catch (err) {
    console.error("Delete error:", err);

    res.status(500).json({
      error: "Failed to delete document",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);

    res.json({
      success: true,
      document: doc,
    });

  } catch (err) {
    res.status(500).json({ error: "Failed to fetch document" });
  }
});

module.exports = router;