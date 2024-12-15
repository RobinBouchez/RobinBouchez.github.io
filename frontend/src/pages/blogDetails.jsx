import React from 'react';
import { useLocation } from "react-router-dom"; 
import './blogDetails.css';

const BlogDetails = () => {
  const location = useLocation();
  const { blogPost } = location.state || {}; // Get the passed blog post from state

  if (!blogPost) {
    return <p>Blog post not found!</p>; // Handle the case where no blog post is passed
  }
  return (
    <div className="blogDetailsContainer">
      <h1 className="blogDetailsTitle">{blogPost.title}</h1>

      <div className="blogDetailsInfo">
        <p className="blogDetailsAuthor">By {blogPost.author}</p>
        <p className="blogDetailsDate">{blogPost.date}</p>
        <p className="blogDetailsReadTime">{blogPost.readTime}</p>
      </div>

      <div className="blogDetailsContent">{blogPost.excerpt}</div>

      <div className="blogDetailsTags">
        <div className="tags">
          {blogPost.tags.map((tag, index) => (
            <span key={index} className="blogDetailsTag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;