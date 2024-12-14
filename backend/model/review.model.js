import { Schema, model } from "mongoose";

const reviewSchema = new Schema({
    stars: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
    },
    description: {
        type: String,
        required: true,
        minlength: 5,
    },
    userEmail: {// use this to find wich user added this listing (email because email is unique)
        type: String,
        required: true,
    },
    dateAdded: {
        type: Date,
        required: true,
    },
});

const Review = model('reviews', reviewSchema);
export default Review;
