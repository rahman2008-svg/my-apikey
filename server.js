const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ API Key (change name/value)
const API_KEYS = (process.env.API_KEYS || "SUPER_SECRET_KEY_999").split(",");

app.use(cors());
app.use(express.json());

// ✅ Middleware: API Key check
app.use((req, res, next) => {
  const key = req.headers["x-api-key"];
  if (!key || !API_KEYS.includes(key)) {
    return res.status(401).json({ error: "Unauthorized: Invalid API Key" });
  }
  next();
});

// Root route
app.get("/", (req, res) => {
  res.json({ status: "OK", message: "API is running with API key!" });
});

// Sum route
app.post("/sum", (req, res) => {
  const { a, b } = req.body;
  if (typeof a !== "number" || typeof b !== "number") {
    return res.status(400).json({ error: "Send numbers a and b" });
  }
  res.json({ result: a + b });
});

// Multiply route
app.post("/multiply", (req, res) => {
  const { a, b } = req.body;
  if (typeof a !== "number" || typeof b !== "number") {
    return res.status(400).json({ error: "Send numbers a and b" });
  }
  res.json({ result: a * b });
});

// ChatGPT/Grok style route
app.post("/chat", (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "Send prompt text" });
  const responseText = `You said: ${prompt}`;
  res.json({ response: responseText });
});

app.listen(PORT, () => console.log("Server running on port", PORT));
