const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { JWT_EXPIRY, JWT_SECRET_KEY } = require("@config/env.config");
const userschema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    credits: {
      type: Number,
      default: 50,
      min: 0,
    },
    isCreditAvailable: {
      type: Boolean,
      required: true,
    },
    notes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Notes",
      default: [],
    },
  },
  { timestamps: true },
);

userschema.methods.generateAccessToken = function () {
  return jwt.sign({ id: this._id }, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRY });
};
const User = mongoose.models.User || mongoose.model("User", userschema);

module.exports = User;
