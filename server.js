const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "OK", message: "API is running!" });
});

// উদাহরণ /sum
app.post("/sum", (req, res) => {
  const { a, b } = req.body;
  res.json({ result: a + b });
});

// উদাহরণ /multiply
app.post("/multiply", (req, res) => {
  const { a, b } = req.body;
  res.json({ result: a * b });
});

app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
