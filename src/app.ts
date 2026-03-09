import express, { Request, Response } from "express";

const app = express();

app.get("/", (_req: Request, res: Response) => {
  res.status(200).send("Wordle running");
});

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).send("OK");
});

const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log("Server listening on port " + PORT);
});

export default app;
