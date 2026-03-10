import express, { Request, Response } from "express";
import fs from "node:fs";
import path from "node:path";

const ROOT_DIR = process.cwd();
const DIST_DIR = path.join(ROOT_DIR, "dist");
const PUBLIC_DIR = path.join(ROOT_DIR, "public");
const FRONTEND_DIR = fs.existsSync(DIST_DIR) ? DIST_DIR : PUBLIC_DIR;

const app = express();

app.use(express.static(FRONTEND_DIR));

app.get("/", (_req: Request, res: Response) => {
  res.sendFile(path.join(FRONTEND_DIR, "index.html"));
});

app.get("/winner", (_req: Request, res: Response) => {
  res.redirect(302, "/winner.html");
});

app.get("/loser", (_req: Request, res: Response) => {
  res.redirect(302, "/loser.html");
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
