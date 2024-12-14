import { Schema, model } from 'mongoose';


const ImageSchema = new Schema({
  filename: { type: String, required: true },
  contentType: { type: String, required: true },
  data: { type: Buffer, required: true },
});

const listingSchema = new Schema({
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
    min: 1,
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
    min: 0
  },
  userEmail: { // use this to find wich user added this listing (email because email is unique)
    type: String,
    required: true,
  },
  uniqueID: {
    type: String,
    required: true,
    unique: true,
  },
  dateAdded: {
    type: Date,
    required: true,
  },
  dateModified: {
    type: Date,
    required: true,
  },
  images: [ImageSchema],
});

const Listing = model('listings', listingSchema);
export default Listing;
