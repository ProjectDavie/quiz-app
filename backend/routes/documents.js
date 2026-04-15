const express = require("express");
const router = express.Router();
const Document = require("../models/Document");

/**
 * GET ALL DOCUMENTS (PROJECTS PAGE)
 */
router.get("/", async (req, res) => {
  try {
    const docs = await Document.find().sort({ createdAt: -1 });
    res.json({ documents: docs });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch documents" });
  }
});

/**
 * GET SINGLE DOCUMENT (QUIZ PAGE)
 */
router.get("/:id", async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);

    if (!doc) {
      return res.status(404).json({ error: "Document not found" });
    }

    res.json({ document: doc });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch document" });
  }
});

/**
 * DELETE DOCUMENT
 */
router.delete("/:id", async (req, res) => {
  try {
    await Document.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

module.exports = router;