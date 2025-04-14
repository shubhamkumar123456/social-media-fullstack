const userCollection = require("../models/userCollection");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "AbrakaDabra123@";
const randomstring = require("randomstring");
const nodemailer = require("nodemailer");
const postCollection = require("../models/postCollection");

// 1+2+3+4+5+6+7+8+9+10 = 55

const registerUser = async (req, res) => {
  let error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }
  const { firstName, lastName, email, password } = req.body;
  try {
    let user = await userCollection.findOne({ email });
    // console.log("user = ", user)
    if (user) {
      return res.status(401).json({ msg: "user already exists" });
    }

    let data = await userCollection.create({
      firstName,
      lastName,
      email,
      password,
    });
    res.status(201).json({ msg: "user created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  //john@gmail.com
  // res.send("login is working")
  const { email, password } = req.body;
  let user = await userCollection.findOne({ email });

  if (user) {
    let comparePassword = bcrypt.compareSync(password, user.password);
    let obj = {
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
      email: user.email,
      bio: user.bio,
    };

    if (comparePassword) {
      let token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "24h" });
      res.status(200).json({ msg: "login successfully", user: obj, token });
    } else {
      res.status(401).json({ msg: "invalid credentials" });
    }
  } else {
    res.status(404).json({ msg: "user not found!" });
  }
};

const updateUser = async (req, res) => {
  const { firstName, lastName, password, bio, profilePic, coverPic } = req.body;

  try {
    const id = req.user._id;
    let user = await userCollection.findOne({ _id: id });

    if (firstName) {
      user.firstName = firstName;
    }
    if (lastName) {
      user.lastName = lastName;
    }
    if (password) {
      user.password = password;
    }
    if (bio) {
      user.bio = bio;
    }
    if (profilePic) {
      user.profilePic = profilePic;
    }
    if (coverPic) {
      user.coverPic = coverPic;
    }

    await user.save();
    res.status(200).json({ msg: "updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  // res.send("delete is working")
  let id = req.user._id;
  try {
    let user = await userCollection.findByIdAndDelete(id);
    res.status(200).json({ msg: "account deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const forgetPassword = async (req, res) => {
  const { email } = req.body;

  let user = await userCollection.findOne({ email });

  if (user) {
    let resetPasswordCode = randomstring.generate(40);
    console.log(resetPasswordCode);
    user.resetPasswordToken = resetPasswordCode;
    await user.save();

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: "shubhamfarainzi@gmail.com",
        pass: "tyvd ibmm xerz daqc",
      },
    });

    async function main() {
      // send mail with defined transport object
      const info = await transporter.sendMail({
        from: "shubhamfarainzi@gmail.com", // sender address
        to: email, // list of receivers
        subject: "Reset Your Social media App Password", // Subject line
        text: `Please click the link below to update your Password \n  http://localhost:8080/users/reset-password/${resetPasswordCode}`, // plain text body
      });

      console.log("Message sent: %s", info.messageId);
      // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
    }

    main().catch(console.error);

    res
      .status(200)
      .json({ msg: "please check youe email for futher informations" });
  } else {
    return res.status(404).json({ msg: "user not found" });
  }
};

const resetPassword = async (req, res) => {
  let { resetToken } = req.params;

  let user = await userCollection.findOne({ resetPasswordToken: resetToken });
  if (user) {
    res.render("passwordReset", { resetToken });
  } else {
    res.send("token expired");
  }
};

const finalPasswordReset = async (req, res) => {
  let { password } = req.body;
  let { resetToken } = req.params;

  console.log(resetToken);
  console.log(password);
  let user = await userCollection.findOne({ resetPasswordToken: resetToken });
  user.password = password;
  user.resetPasswordToken = "";
  await user.save();
  res.status(200).json({ msg: "user updated successfully" });
};

const getLoggedInUser = async (req, res) => {
  try {
    let user = req.user;

    console.log("user = ", user);

    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "error in getting user", error: error.message });
  }
};

const followUser = async (req, res) => {
  const { friendId } = req.params;
  const { _id } = req.user;
  try {
    let user = await userCollection.findById(_id);
    let friend = await userCollection.findById(friendId);

    if (user.followings.includes(friendId) && friend.followers.includes(_id)) {
      user.followings.pull(friendId);
      friend.followers.pull(_id);
      await user.save();
      await friend.save();
      res.status(200).json({ msg: "unfollow successfully" });
    } else {
      user.followings.push(friendId);
      friend.followers.push(_id);
      await user.save();
      await friend.save();
      res.status(200).json({ msg: "follow successfully" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ msg: "error in following part", error: error.message });
  }
};

const getFriend = async (req, res) => {
  const { friendId } = req.params;
  let { _id } = req.user;

  let friend = await userCollection.findById(friendId).select("-password");
  let friendPost = await postCollection
    .find({ userId: friendId })
    .populate({
      path: "userId",
      select: ["profilePic", "firstName", "lastName"],
    })
    .populate({
      path: "comments",
      populate: { path: "user", select: "firstName lastName profilePic" },
    });

  res.status(200).json({ msg: "friend find successfully", friend, friendPost });
};

const findUserByName = async (req, res) => {
  try {
    let { name } = req.query;
    console.log(name);
    if (!name) {
      return res.json({ msg: "not found", users: [] });
    }
    let regex = new RegExp(name);
    let users = await userCollection
      .find({ firstName: regex })
      .select("firstName lastName profilePic");
    console.log(users);
    res.json({ msg: "all is well", users });
  } catch (error) {
    res
      .status(200)
      .json({ msg: "friend find successfully", friend, friendPost });
  }
};

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  forgetPassword,
  resetPassword,
  finalPasswordReset,
  getLoggedInUser,
  followUser,
  getFriend,
  findUserByName,
};
