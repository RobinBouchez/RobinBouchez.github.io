import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/user.js";
import { config } from "dotenv";

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

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      console.log(email);
      return res.json({ error: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (match) {
      jwt.sign(
        { email: user.email, id: user._id, firstName: user.firstName, lastName: user.lastName },
        process.env.JWT_SECRET_KEY,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(user);
        }
      );
    } else {
      res.json({ error: "Passwords do not match" });
    }
  } catch (e) {
    console.log(e);
  }
};

export const getAccount = (req, res) => {
  const { token } = req.cookies || {};
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, {}, (err, decoded) => {
      if (err) throw err;
      res.json(decoded);
    });
  } else {
    res.json({ error: "No token found" });
  }
};

export const logoutUser = (req, res) => {
  const { token } = req.cookies || {};
  if (token) {
    res.clearCookie("token").json({ message: "User logged out" });
  } else {
    res.json({ error: "No token found" });
  }
};
