const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
  type: String,
  enum: ["user", "admin"],
  default: "user",
},

  refreshToken: {
    type: String,
  },
});

userSchema.index({ name: 1, email: 1 }, { unique: true });
module.exports = mongoose.model("User", userSchema);
