import express from 'express';
import cors from "cors";
import { addListing, removeListing, getListing, upload } from '../controllers/listing.controller.js';

const router = express.Router();


router.use(cors({
  origin: ["http://localhost:3000", "https://switcharoom.social", "https://robinbouchez.github.io", "https://www.switcharoom.social" ],
  credentials: true
}));

router.post('/addlisting', upload.array('images', 10), addListing);



export default router;