import express from 'express';
import cors from "cors";
import { getAccount, registerUser, loginUser, logoutUser } from '../controllers/authController.js';

const router = express.Router();

router.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));


router.post('/logout', logoutUser);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/account', getAccount);


export default router;