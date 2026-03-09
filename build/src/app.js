"use strict";
const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "..", "public")));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});
app.get("/winner", (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'winner.html'));
});
app.get("/loser", (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'loser.html'));
});
app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK" });
});
module.exports = app;
