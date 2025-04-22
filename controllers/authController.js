import { userModel } from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const {ObjectId} = mongoose.Types;

const signup = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const existingUsername = await userModel.findOne({ username });

    if (existingUsername) {
      return res.status(400).send({ error: "Try another username." });
    }

    const existingEmail = await userModel.findOne({ email });

    if (existingEmail) {
      return res.status(400).send({ error: "Try another email." });
    }
   
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const user = await userModel.create({
      email,
      username,
      password: hashPassword,
    });

    res.status(200).send({
      message: "User registered Successfully.",
      user,
      success: true,
    });
  } catch (error) {
    console.log('error', error)
    return res.status(500).send({ message: error.message, success: false });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email })
    if (!user) {
      return res
        .status(404)
        .send({ message: "Please register first.", success: false });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password,
    );

    if (!isPasswordCorrect) {
      return res
        .status(400)
        .send({ message: "Enter valid password.", success: false });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });
    res.cookie("jwt", token, { maxAge: 1000 * 60 * 60 * 24 * 5 });

    res.status(200).send({
      message: "Logged in successfully!!!",
      user,
      token,
      success: true,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message, success: false });
  }
};
const logout = async (req, res) => {
  try {
    const id = req.user._id;
    userModel.findOneAndUpdate({_id: (id)}, {isLoggedIn: false}, {new: true})
    res.cookie("jwt", "", { maxAge: 0 });

    return res
      .status(200)
      .send({ message: "Logged out successfully!!!", success: true });
  } catch (error) {
    return res.status(500).send({ message: error.message, success: false });
  }
};

const me = async (req, res) => {
  try {
    const id = req.user._id;
    const user = await userModel.findById(id);
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });
    res.status(200).send({
      message: "Logined successfully!!!",
      userData: {
        _id: user._id,
        fullName: user.fullName,
        username: user.username,  
        gender: user.gender,
        profilePic: user.profilePic,
      },
      token,
      success: true,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message, success: false });
  }
};

export { signup, login, logout, me };
