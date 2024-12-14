import express from 'express';
import cors from "cors";
import { getAccount, registerUser, loginUser, logoutUser } from '../controllers/auth.controller.js';
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(cors({
  origin: process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : 'https://switchAroom.social',
  credentials: true
}));


router.post('/logout', logoutUser);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/account', protectRoute, getAccount);


export default router;