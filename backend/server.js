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
connectDB();

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

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});