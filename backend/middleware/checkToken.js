const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET
const userCollection = require("../models/userCollection");
require('dotenv').config()

const checkToken = async (req, res, next) => {
  let token = req.headers.authorization;
  console.log("token = ", token);

  try {
    let decode = jwt.verify(token, JWT_SECRET);
    // console.log("decode", decode)
    let user = await userCollection.findById(decode._id).select("-password");
    // console.log(user)
    req.user = user;
    next();
  } catch (error) {
    res
      .status(401)
      .json({ msg: "unauthorized", success: false, error: error.message });
  }
};

module.exports = checkToken;
