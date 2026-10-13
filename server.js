
const express = require("express");
const rateLimiter = require("./rateLimiter");

const app = express();

app.use(express.json());


app.post(
  "/ai/generate",
  rateLimiter("ai"),
  (req, res) => {
    res.status(200).json({ ok: true });
  }
);

app.post(
  "/ai/summarise",
  rateLimiter("ai"),
  (req, res) => {
    res.status(200).json({ ok: true });
  }
);


app.get(
  "/data/list",
  rateLimiter("read"),
  (req, res) => {
    res.status(200).json({ ok: true });
  }
);

app.get(
  "/data/export",
  rateLimiter("read"),
  (req, res) => {
    res.status(200).json({ ok: true });
  }
);

app.get("/", (req, res) => {
  res.json({ message: "Nestack Rate Limiter API is running" });
});

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
