import express from 'express';
import cors from "cors";
import { getAllListings } from '../controllers/listingsController.js';

const router = express.Router();

// Enable CORS for this route
router.use(cors({
    origin: ["http://localhost:3000", "https://switcharoom.social", "https://robinbouchez.github.io", "https://www.switcharoom.social" ],
    credentials: true
}));

// Route to fetch all listings
router.get('/listings', getAllListings);

export default router;