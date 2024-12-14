import Listing from "../model/listing.model.js";
import { config } from "dotenv";
import multer from "multer";
import express from 'express';

config();

const storage = multer.memoryStorage();
export const upload = multer({ storage });

export const addListing = async (req, res) => {
  console.log("Incoming text fields:", req.body); // Logs req.body
  console.log("Incoming files:", req.files);
  try {
    const { city, country, street, houseNumber, description, startDate, endDate, price, userEmail, userID, dateAdded } = req.body;

    const images = req.files.map((file) => ({
      filename: file.originalname,
      contentType: file.mimetype,
      data: file.buffer, // Save binary data
    }));

    // Create new listing
    const newListing = new Listing({
      city,
      country,
      street,
      houseNumber,
      description,
      startDate,
      endDate,
      price,
      userEmail: userEmail,
      uniqueID: userID,
      dateAdded: dateAdded,
      dateModified: dateAdded,
      images,
    });
    await newListing.save();

    res.status(201).json({ message: "Listing added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to add listing", error: error.message });
  }
};


export const removeListing = async (req, res) => {
  try {
    const { uniqueID } = req.body;
    await newListing.deleteOne({ uniqueID: uniqueID })
    res.status(201).json({ message: "Listing removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove listing", error: error.message });
  }
};


export const getListing = async (req, res) => {
  try {
    const { userEmail } = req.body;
    const foundListing = await Listing.find({ userEmail: userEmail });
    res.status(200).json(foundListing);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve listing", error: error.message });
  }
};

export const updateListingImages = async (req, res) => {
  try {
    const { uniqueID, newImages } = req.body;

    // Convert base64 images to Buffers
    const newImageBuffers = newImages.map(image => {
      const base64String = image.split(';base64,').pop();
      return Buffer.from(base64String, 'base64');
    });

    // Find listing and append new images
    const listing = await Listing.findOne({ uniqueID });
    if (!listing) return res.status(404).json({ message: 'Listing not found' });

    listing.images.push(...newImageBuffers); // Append new images
    await listing.save();

    res.status(200).json({ message: 'Images added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update images', error: error.message });
  }
};
