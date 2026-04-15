const Notes = require("@model/notes.model");

const get_my_notes = async (req, res, next) => {
  try {
    const notes = await Notes.find({ user: req.userId })
      .select(
        "topic   classLevel examType   revisionMode   includeDiagram  includeChart createdAt",
      )
      .sort({ createdAt: -1 });

    if (!notes) {
      return res.status(404).json({
        error: "Notes not found",
      });
    }
    return res.status(200).json(notes);
  } catch (error) {
    console.error("eror in get user current notes ", error);
    next(error);
  }
};

const get_single_note = async (req, res, next) => {
  try {
    const note = await Notes.findOne({
      _id: req.params.id,
      user: req.userId,
    });

    if (!note) {
      return res.status(404).json({
        error: "Notes not found",
      });
    }
    return res.status(200).json({
      content: note.content,
      topic: note.topic,
      createdAt: note.createdAt,
    });
  } catch (error) {
    console.error("error in get single notes", error);
    next(error);
  }
};

module.exports = { get_my_notes, get_single_note };
