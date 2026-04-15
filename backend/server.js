const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const uploadRoute = require("./routes/upload");
const documentsRoute = require("./routes/documents");

const connectDB = require("./config/db");

const app = express();

/* ========================
   CONNECT MONGODB
======================== */
async function startServer() {
  await connectDB();

  try {
    const collection = mongoose.connection.collection("documents");
    const indexes = await collection.indexes();

    if (indexes.some((index) => index.name === "slug_1")) {
      await collection.dropIndex("slug_1");
      console.log("✅ Dropped stale slug unique index");
    }
  } catch (err) {
    if (err.codeName !== "IndexNotFound") {
      console.error("Failed to clean up slug index:", err);
    }
  }

  /* ========================
     MIDDLEWARE
  ======================== */
  app.use(cors({
    origin: "http://localhost:3000",
  }));

  app.use(express.json());

  /* ========================
     ROUTES
  ======================== */
  app.use("/", uploadRoute);
  app.use("/documents", documentsRoute);

  /* ========================
     START SERVER
  ======================== */
  const PORT = 5000;

  app.get("/test-ai", async (req, res) => {
    try {
      const OpenAI = require("openai");

      const client = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });

      const result = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: "Say hello in one word" }],
      });

      res.json({
        response: result.choices[0].message.content,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "AI failed" });
    }
  });

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});