import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
import { config } from "dotenv";
import { generateToken } from "../lib/utils.js";
const randomInt = (min = 0, max = 1000) => Math.floor(Math.random() * (max - min + 1)) + min;

config();

export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    const Pic = `https://avatar.iran.liara.run/public/${randomInt(1, 70)}`

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      profilePic: Pic,
    });
    
    generateToken(newUser._id, res);
    
    await newUser.save();
    
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log("Error in register controller", error.message);
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (match) {
      generateToken(user._id, res);
      res.json({ user: user });
    } else {
      res.json({ error: "Passwords do not match" });
    }
  } catch (e) {
    console.log(e);
  }
};


export const loginGoogleUser = async (req, res) => {
  const { id, email, firstName, lastName, profilePic, access_token } = req.body;
  const user = new User({
    _id: id,
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: access_token,
    profilePic: profilePic,
  });
    generateToken(user._id, res);
    const exists = await User.findOne({ email });
    console.log(exists);  
    if (!exists) {
      await user.save();
    }
    res.json({ user: user });
};

export const getAccount = (req, res) => {
  const cookie = req.cookies || {};
  if (cookie != {}) {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_KEY, {}, (err, decoded) => {
        if (err) throw err;
        // res.json(decoded);
        res.status(200).json(req.user);
      });
  } else {
    res.json({ error: "No token found" });
  }
}
};

export const logoutUser = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};