const { generateNotes } = require("../controller/generate.controller");
const { Authenticated } = require("../middleware/auth.middleware");

const generateRoute = require("express").Router();

generateRoute.post("/", Authenticated, generateNotes);

module.exports = generateRoute;
