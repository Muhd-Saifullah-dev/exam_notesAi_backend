const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
require("@model/index");

app.use(express.json({ limit: "16mb" }));
app.use(cookieParser());

app.get("/health-check", async (req, res, next) => {
  return res.status(200).json({
    success: true,
    message: "server is running up !!!",
  });
});

module.exports = app;
