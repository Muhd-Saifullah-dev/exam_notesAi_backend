const User = require("@model/user.model");
const { asyncHandler } = require("src/constant/asyn_handler");
const Responses = require("@constant/responses");
const responses = new Responses();
const googleAuth = asyncHandler(async (req, res, next) => {
  const { email, name } = req.body;
  let user = await User.findOne({ email });
  if (!user) {
    user = await User.create({
      name: name,
      email: email,
    });
  }

  const token = await user.generateAccessToken();
  console.log(token);
  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    samesite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return res.json(responses.create_success_response(user));
});
