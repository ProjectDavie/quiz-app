const express = require("express");
const cors = require("cors");

const uploadRoute = require("./routes/upload");

const app = express();

app.use(cors());
app.use(express.json());

/* Test Route */
app.get("/", (req, res) => {
  res.send("PDF Quiz Backend Running");
});

/* Routes */
app.use("/api", uploadRoute);

/* Server */
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});