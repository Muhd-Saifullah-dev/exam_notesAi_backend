const cookieParser = require("cookie-parser");
const express = require("express");
const rootRoute = require("./api/v1/routes/root.route");
const cors=require("cors");
const globalErrorMiddleware = require("./api/v1/middleware/globalError.middleware");
const { requestLogger, errorLogger } = require("@config/express.winston.logger");
const app = express();
require("@model/index");



app.use(requestLogger)

app.use(cors({
  origin:"http://localhost:5173",
  credentials:true,
  methods:["GET","POST","PUT","PATCH","OPTIONS"]
}))
app.use(express.json({ limit: "16mb" }));
app.use(cookieParser());



app.use("/api/v1",rootRoute)
app.get("/health-check", async (req, res, next) => {
  return res.status(200).json({
    success: true,
    message: "server is running up !!!",
  });
});

app.use(errorLogger)
app.use(globalErrorMiddleware)

module.exports = app;
