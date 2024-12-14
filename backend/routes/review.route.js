import express from 'express';
import cors from "cors";
import { getReviews, addReview } from '../controllers/review.controller.js';

const router = express.Router();


router.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

router.get('/account', getReviews);
router.post('/listing', addReview);

export default router;