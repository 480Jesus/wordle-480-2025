import express, { Request, Response } from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/", (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.get("/winner", (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "..", "public", "winner.html"));
});

app.get("/loser", (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "..", "public", "loser.html"));
});

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).send("OK");
});

const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log("Server ready on port " + PORT);
});

export default app;
