import express, { Request, Response } from "express";
import path from "node:path";

const ROOT_DIR = process.cwd();

const app = express();

app.use(express.static(path.join(ROOT_DIR, "public")));

app.get("/", (_req: Request, res: Response) => {
  res.sendFile(path.join(ROOT_DIR, "public", "index.html"));
});

app.get("/winner", (_req: Request, res: Response) => {
  res.sendFile(path.join(ROOT_DIR, "public", "winner.html"));
});

app.get("/loser", (_req: Request, res: Response) => {
  res.sendFile(path.join(ROOT_DIR, "public", "loser.html"));
});

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).send("OK");
});

const PORT = Number(process.env.PORT) || 3000;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, "0.0.0.0", () => {
    console.log("Server ready on port " + PORT);
  });
}

export default app;
