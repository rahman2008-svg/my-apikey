const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 🔑 Multiple API Keys
const API_KEYS = (process.env.API_KEYS || "MY_SECRET_KEY_123,ANOTHER_KEY_456").split(",");

// 🔐 Middleware: API Key চেক
app.use((req, res, next) => {
  const key = req.headers["x-api-key"];
  if (!key || !API_KEYS.includes(key)) {
    return res.status(401).json({ error: "Unauthorized: Invalid API Key" });
  }
  next();
});

// Root route
app.get("/", (req, res) => {
  res.json({ status: "OK", message: "API is running with multiple API keys!" });
});

// Routes
app.post("/sum", (req, res) => {
  const { a, b } = req.body;
  if (typeof a !== "number" || typeof b !== "number") {
    return res.status(400).json({ error: "Send numbers a and b" });
  }
  res.json({ result: a + b });
});

app.post("/multiply", (req, res) => {
  const { a, b } = req.body;
  if (typeof a !== "number" || typeof b !== "number") {
    return res.status(400).json({ error: "Send numbers a and b" });
  }
  res.json({ result: a * b });
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
