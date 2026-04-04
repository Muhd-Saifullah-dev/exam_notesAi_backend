const { JWT_SECRET_KEY } = require("@config/env.config");
const Responses = require("@constant/responses");
const jwt = require("jsonwebtoken");
const responses = new Responses();
const User = require("@model/user.model");

const Authenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res
        .status(401)
        .json(responses.bad_request_error("Token is missing", null));
    }

    const verifytoken = jwt.verify(token, JWT_SECRET_KEY);
    const user = await User.findById(verifytoken.id);
    if (!user) {
      return res
        .status(401)
        .json(responses.bad_request_error("User does not exist", null));
    }

    req.id = verifytoken.id;
    req.user = user;
    req.userId = user._id;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);

    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json(responses.server_error_response("JWT token expired"));
    } else if (error.name === "JsonWebTokenError") {
      return res
        .status(401)
        .json(responses.server_error_response("Invalid JWT token"));
    } else {
      return res
        .status(500)
        .json(responses.server_error_response("Internal server error"));
    }
  }
};

module.exports = { Authenticated };
