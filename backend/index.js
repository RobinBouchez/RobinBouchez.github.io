//Main server file for the backend application
import dotenv from "dotenv";
import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import multer from "multer";
import axios from "axios";
import OpenAI from "openai";
import path from "path";
import fs from "fs";

// Models
import User from "./model/user.model.js";
import Listing from "./model/listing.model.js";
import Message from "./model/message.model.js";
import Review from "./model/review.model.js";

// Routes
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import listingRoutes from "./routes/listing.route.js";
import reviewRoutes from "./routes/review.route.js";
import blogRoutes from "./routes/blog.route.js";

// Libraries
import { connectToDB } from "./lib/db.js";

import { app, server } from "./lib/socket.js";

const port = process.env.PORT;

dotenv.config();
app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000", "https://switcharoom.social", "https://robinbouchez.github.io", "https://www.switcharoom.social" ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middlewares routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api", listingRoutes);
app.use("/api", reviewRoutes);
app.use("/api/blog", blogRoutes);

// Bodyparser gets the req.body
app.use(urlencoded({ extended: false }));

app.use(express.json({ limit: "100mb" })); // Adjust limit as needed
app.use(express.urlencoded({ limit: "100mb", extended: true }));

// Multer upload configuration
const upload = multer({
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  storage: multer.memoryStorage(),
});

app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

app.get("/api/faq", async (req, res) => {
  const question = req.query.question;

  if (!question || !question.trim().length) {
    return res.status(400).json({ error: "Question parameter is missing or empty." });
  }

  try {
    // Read the FAQ file asynchronously
    const faq = await fs.promises.readFile("./features.txt", "utf8");
    console.log("FAQ File Content:", faq);

    // Set up the OpenAI client
    const openai = new OpenAI(process.env.OPENAI_API_KEY);
    const model = "gpt-3.5-turbo";

    // Build the prompt
    const prompt = [];
    prompt.push("You are a company support agent. You are helping a customer with a question.");
    prompt.push("Politely answer the customer's question, or politely tell the customer that you do not have the answer.");
    prompt.push(faq);

    const messages = [
      {
        role: "system",
        content: prompt.join(" "),
      },
      {
        role: "user",
        content: question,
      },
    ];

    console.log("Sending request to OpenAI...");

    // Send the request to OpenAI
    const completion = await openai.chat.completions.create({
      model: model,
      messages: messages,
    });

    const aiResponse = completion.choices[0].message.content;
    console.log("OpenAI Response:", aiResponse);

    // Respond with the AI's response
    res.json({ aiResponse });
  } catch (err) {
    console.error("Error occurred:", err.message);
    res.status(500).json({ error: "An error occurred while processing your request." });
  }
});
//Route to get all users.
  app.get("/getUsers", async (req, res) => {
  const userData = await User.find();
  res.json(userData);
});

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
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
