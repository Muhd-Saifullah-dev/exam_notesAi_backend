const { asyncHandler } = require("@constant/asyn_handler");
const Responses = require("@constant/responses");
const responses = new Responses();
const getCurrentUser = asyncHandler(async (req, res, next) => {
  const userId = req.id;
  const user = req.user;

  return res.json(responses.ok_response(user, "user fetched successfully"));
});


module.exports={getCurrentUser}