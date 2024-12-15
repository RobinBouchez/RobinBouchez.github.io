import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
    },
    author: {
      ref: "User",
      type: String,
    },
    date: {
      type: String,
    },
    readTime: {
      type: String,
    },
    tags: {
      type: Array,
    },
  },
  { timestamps: true }
);

const BlogPost = mongoose.model("blogposts", blogSchema);

export default BlogPost;