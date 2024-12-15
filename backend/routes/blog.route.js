
import express from 'express';
import cors from "cors";
import { getAllBlogPosts, getBlogPost } from '../controllers/blog.controller.js';

const router = express.Router();

router.use(cors({
  origin: ["http://localhost:3000", "https://switcharoom.social", "https://robinbouchez.github.io", "https://www.switcharoom.social" ],
  credentials: true
}));


router.get("/blogposts", getAllBlogPosts);
router.get("/blog/:id", getBlogPost);


export default router;