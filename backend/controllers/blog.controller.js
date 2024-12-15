import User from "../model/user.model.js";
import BlogPost from "../model/blog.model.js"; // Updated file name to match your intention

export const getBlogPost = async (req, res) => {
  try {
    const { id } = req.params; // Extract ID from request parameters
    const foundBlogPost = await BlogPost.findById(id); // Find blog post by ID

    if (!foundBlogPost) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    res.status(200).json(foundBlogPost);
  } catch (error) {
    console.error("Error fetching blog post:", error);
    res.status(500).json({ message: "Server error while fetching blog post" });
  }
};

export const getAllBlogPosts = async (req, res) => {
  try {
    const allBlogPosts = await BlogPost.find(); // Fetch all blog posts
    res.status(200).json(allBlogPosts);
  } catch (error) {
    console.error("Error fetching all blog posts:", error);
    res.status(500).json({ message: "Server error while fetching all blog posts" });
  }
};