import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// ESM __dirname helper
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// serve static assets without overriding the root route
app.use(express.static(__dirname, { index: false }));
app.use(express.static(path.join(__dirname, "..", "public"), { index: false }));

// root route
app.get("/", (_req, res) => {
  res.status(200).send("Wordle is running");
});

// winner/loser pages
app.get("/winner", (_req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'winner.html'));
});

app.get("/loser", (_req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'loser.html'));
});

// health check for Render
app.get("/health", (_req, res) => {
  res.status(200).send("OK");
});

// start server
const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server listening on http://0.0.0.0:${PORT}`);
});

export default app;
