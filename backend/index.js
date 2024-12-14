//Main server file for the backend application
import dotenv from "dotenv";
import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser"; 
import cors from "cors";

// Models
import User from "./model/user.model.js";
import Listing from "./model/listing.model.js";
import Message from "./model/message.model.js";
import Review from "./model/review.model.js";

// Routes
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import listingRoutes from './routes/listing.route.js';
import reviewRoutes from './routes/review.route.js';

// Libraries
import { connectToDB } from "./lib/db.js";

import { app, server } from "./lib/socket.js";

const port = process.env.PORT;

dotenv.config();
app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: "/",
    credentials: true,
  })
);

// Middlewares routes
app.use('/api/auth', authRoutes);
app.use("/api/messages", messageRoutes);
app.use('/api', listingRoutes);
app.use('/api', reviewRoutes);

// Bodyparser gets the req.body
app.use(urlencoded({ extended: false }));


//Route to get all users.
app.get("/getUsers", async (req, res) => {
  const userData = await User.find();
  res.json(userData);
});

//Route to get all listings.
app.get("/getListings", async (req, res) => {
  const ListingData = await Listing.find();
  res.json(ListingData);
});

//Route to get all listings.
app.get("/getMessages", async (req, res) => {
  const MessageData = await Message.find();
  res.json(MessageData);
});


server.listen(port, () => {
  console.log(`Server started on port ${port}`);
  connectToDB();
});
