const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
const refreshToken = require("../config/refreshToken");
const bcrypt = require("bcrypt");


const createUser = async (req, res) => {
  const { name, email, age, password } = req.body;

  if (!name || !email || !age || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      age,
      password:hashedPassword,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      age: user.age,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  // check if user exists or not
  const findUser = await User.findOne({ email });
if (findUser && (await bcrypt.compare(password, findUser.password))) {
    const newRefreshToken = await refreshToken(findUser?._id);
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      age: findUser?.age,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
};

module.exports = {
  createUser,
  loginUser,
};
