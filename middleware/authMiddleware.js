const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authMiddleware = async (req, res, next) => {
  const authorization = req.header.authorization;

  if (authorization && !authorization.startWith("Bearer"))
    return res
      .status(401)
      .send({ message: "Authorization header is missing or invalid" });

  const token = authorization.split(" ")[1];
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne(decode?.id || decode?._id);

    req.user = user;
    next();
  } catch (error) {}
};

module.exports = { authMiddleware };
