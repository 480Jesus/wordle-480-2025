import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(express.json());
app.use(express.static(__dirname, { index: false }));
app.use(express.static(path.join(__dirname, "..", "public"), { index: false }));
app.get("/", (_req, res) => {
    res.status(200).send("Wordle is running");
});
app.get("/winner", (_req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "winner.html"));
});
app.get("/loser", (_req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "loser.html"));
});
app.get("/health", (_req, res) => {
    res.status(200).send("OK");
});
const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
});
export default app;
