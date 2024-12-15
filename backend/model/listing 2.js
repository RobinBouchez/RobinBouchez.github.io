import { Schema, model } from 'mongoose';
import mongooseFuzzySearching from "mongoose-fuzzy-searching";


const listingSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true,
        minlength: 2,
    },
    country: {
        type: String,
        required: true,
        minlength: 2,
    },
    street: {
        type: String,
        required: true,
        minlength: 1,
    },
    houseNumber: {
        type: Number,
        required: true,
        min:1,
    },
    description: {
        type: String,
        required: true,
        minlength: 5,
    },
    startDate: { //month
        type: Date,
        required: true,
    },
    endDate: { //month
        type: Date,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min:0
    },
    userEmail: { // use this to find wich user added this listing (email because email is unique)
        type: String,
        required: true,
    },
    //Pictures
    uniqueID: {
        type: String,
        required: true,
        unique: true,
    }
});

listingSchema.plugin(mongooseFuzzySearching, { fields: ["city", "country", "street"] });

const Listing = model('listings', listingSchema);
export default Listing;
