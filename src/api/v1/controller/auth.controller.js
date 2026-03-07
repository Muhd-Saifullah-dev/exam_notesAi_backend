const User = require("@model/user.model");
const { asyncHandler } = require("@constant/asyn_handler");
const Responses = require("@constant/responses");
const responses = new Responses();
const admin = require("@config/firebase.config");

const googleAuth = asyncHandler(async (req, res, next) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({ message: "Token missing" });
  }

  const decodedToken = await admin.auth().verifyIdToken(idToken);

  const { email, name, picture, uid } = decodedToken;

  console.log(email, name, picture, uid);
  let user = await User.findOne({ email });

if(!user){
  user = await User.create({
    name,
    email,
    googleId: uid,
    profilePic: picture,
    isVerified: true,
    provider: "google",
  });
}
  const accessToken = await user.generateAccessToken();
  console.log("access token",accessToken)
  res.cookie("token", accessToken, {
    httpOnly: true,
  secure: false,
  sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json(
    responses.create_success_response({
      user,
      accessToken,
    }),
  );
});

const logout = asyncHandler(async (req, res, next) => {
  await res.clearCookie("token");
  return res.json(responses.ok_response(null, "logout successfully"));
});

module.exports = { googleAuth, logout };
