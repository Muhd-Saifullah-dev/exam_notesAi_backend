const { generateNotes } = require("../controller/generate.controller");
const {
  get_my_notes,
  get_single_note,
} = require("../controller/notes.controller");
const { Authenticated } = require("../middleware/auth.middleware");

const generateRoute = require("express").Router();

generateRoute.post("/", Authenticated, generateNotes);
generateRoute.get("/all", Authenticated, get_my_notes);
generateRoute.get("/single/:id", Authenticated, get_single_note);

module.exports = generateRoute;
