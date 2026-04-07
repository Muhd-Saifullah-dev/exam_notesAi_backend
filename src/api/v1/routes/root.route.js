const authRoute = require("./auth.routes");
const generateRoute = require("./generate.route");
const userRoute = require("./user.routes");
const Responses = require("@constant/responses");
const responses = new Responses();
const express = require("express");
const rootRoute = express.Router();

rootRoute.use("/auth", authRoute);
rootRoute.use("/user", userRoute);
rootRoute.use("/notes", generateRoute);

rootRoute.use((req, res, next) => {
  return res.json(
    responses.bad_request_error("Endpoint not found", {
      path: req.originalUrl,
    }),
  );
});
module.exports = rootRoute;
