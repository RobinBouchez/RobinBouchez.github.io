import Review from "../model/review.model.js";
import { config } from "dotenv";

config();

export const getReviews = async (req, res) => {
    console.log("Incoming text fields:", req.body); // Logs req.body
    try {
        const { userEmail } = req.body;
        if (!userEmail) {
            return res.status(400).json({ message: "userEmail is required" });
        }
        const reviewsFound = await Review.find({ userEmail: userEmail });
        res.status(200).json(reviewsFound);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve listing", error: error.message });
    }
};

export const addReview = async (req, res) => {
    console.log("Incoming text fields:", req.body); // Logs req.body
    try {
        const { userEmail, rating, text, dateAdded } = req.body;

        const newReview = new Review({
            stars: rating,
            description: text,
            userEmail: userEmail,
            dateAdded: dateAdded
        })
        await newReview.save();
        res.status(201).json({ message: "Review added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve listing", error: error.message });
    }
};
