const mongoose = require("mongoose");

const PageSchema = new mongoose.Schema(
  {
    pageNumber: {
      type: Number,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const DocumentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    pages: {
      type: [PageSchema],
      default: [],
    },
    questions: {
      type: Array,
      default: [],
    },
    flashcards: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Document", DocumentSchema);