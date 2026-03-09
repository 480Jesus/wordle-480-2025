import express from "express";
import path from "node:path";
const __dirname = process.cwd();
const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (_req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.get("/winner", (_req, res) => {
    res.sendFile(path.join(__dirname, "public", "winner.html"));
});
app.get("/loser", (_req, res) => {
    res.sendFile(path.join(__dirname, "public", "loser.html"));
});
app.get("/health", (_req, res) => {
    res.status(200).send("OK");
});
const PORT = Number(process.env.PORT) || 3000;
if (process.env.NODE_ENV !== "test") {
    app.listen(PORT, "0.0.0.0", () => {
        console.log("Server ready on port " + PORT);
    });
}
export default app;
