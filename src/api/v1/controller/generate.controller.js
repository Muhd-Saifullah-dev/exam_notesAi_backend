const User = require("@model/user.model");
const Responses = require("@constant/responses");
const { buildPrompt } = require("src/utils/promptBuilder");
const Notes = require("@model/notes.model");
const responses = new Responses();

const generateNotes = async (req, res, next) => {
  try {
    const {
      topic,
      classLevel,
      examType,
      revisionMode = false,
      includeDiagram = false,
      includeChart = false,
    } = req.body;
    const user = await User.findById(req.userId);
    if (!user) {
      return res
        .status(400)
        .json(responses.bad_request_error("user not found"));
    }

    if (user.credit < 10) {
      user.isCreditAvailable = false;
      await user.save();
      return res
        .status(403)
        .json(responses.bad_request_error("Insufficient Credits", null));
    }
    const prompt = buildPrompt({
      topic,
      classLevel,
      examType,
      revisionMode,
      includeChart,
      includeDiagram,
    });

    const aiResponse = await generateNotes(prompt);

    const notes = await Notes.create({
      user: user._id,
      topic,
      classLevel,
      examType,
      revisionMode,
      includeChart,
      includeDiagram,
      content: aiResponse,
    });
    user.credits -= 10;
    if (user.credits <= 0) user.isCreditAvailable = false;
    if (!Array.isArray(user.notes)) {
      user.notes = [];
    }
    user.notes.push(note._id);
    await user.save();

    return res
      .status(200)
      .json(
        responses.ok_response({
          aiReponse,
          noteId: notes._id,
          creditleft: user.credits,
        }),
      );
  } catch (error) {
    console.log("error in generate notes", error);
    next(error);
  }
};
