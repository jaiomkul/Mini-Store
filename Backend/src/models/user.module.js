const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    number: { type: String, required: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Other"],
      default: "Male",
    },
    birthdate: { type: Date, required: false },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
