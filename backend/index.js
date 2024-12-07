import { config } from "dotenv";
import express, { json, urlencoded } from "express";
import { set, connect } from "mongoose";
import cors from "cors";
const app = express();
import User from "./model/user.js";
import bcrypt from "bcryptjs";
import authRoutes from './routes/authRoutes.js';
import cookieParser from "cookie-parser";

config();
app.use(cookieParser());
app.use(json());

app.use('/', authRoutes);

// DB config
const db = process.env.MONGO_URL;
set("strictQuery", true);

// connect to mongo
connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.log(error));

// bodyparser gets the req.body
app.use(urlencoded({ extended: false }));

app.get("/checkWalletAddress/:walletAddress", async (req, res) => {
  const { walletAddress } = req.params;
  const document = await findOne({ walletAddress });
  const exists = !!document;
  res.json({ exists });
});

app.post("/insert", async (req, res) => {
  const walletAddress = req.body.walletAddress;

  const formData = new User({
    walletAddress,
  });

  try {
    await formData.save();
    res.send("inserted data..");
  } catch (err) {
    console.log(err);
  }
});


const port = process.env.PORT || 4000;

app.get("/getUsers", async (req, res) => {
  const userData = await User.find();
  res.json(userData);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
