const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema(
  {
    title: String,
    slug: {
      type: String,
      required: false,
    },

    // NEW 👇
    mode: {
      type: String,
      enum: ["ai", "offline"],
      default: "offline",
    },

    pages: Array,
    questions: Array,
    flashcards: Array,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Document", DocumentSchema);