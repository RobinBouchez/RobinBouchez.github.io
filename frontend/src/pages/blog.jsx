import React from "react";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import axios from "axios"; // Import axios for making HTTP requests
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Image from "react-bootstrap/Image";

import "./blog.css";

const Blog = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [blogPosts, setBlogPosts] = React.useState([]); // State for blog posts

  // Function to fetch blog posts
  const fetchBlogPosts = async () => {
    try {
      const response = await axios.get("/blog/blogposts");
      console.log("Blog posts:", response.data);
      setBlogPosts(response.data);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
    }
  };

  // Fetch blog posts when the component mounts
  React.useEffect(() => {
    fetchBlogPosts();
  }, []);

  const handleClick = (post) => {
    navigate(`/blog/${post._id}`, { state: { blogPost: post } }); // Pass the post object in the state
  };

  return (
    <div className="blogContainer">
      <h1 className="blogTitle">Our Blog</h1>

      <div className="blogGrid">
        {blogPosts.map((post) => (
          <Card
            onClick={() => handleClick(post)} 
            key={post.id}
            className="blogCard"
          >
            <Card.Title className="blogCard-title">{post.title}</Card.Title>
            <Card.Body className="blogCard-content">
              <p className="text-muted-foreground mb-4">{post.excerpt}</p>

              <div className="blogCard-info">
                <div className="blogCard-info-author">
                  <Image src={post.authorImage} />
                  <div className="author-date">
                    <p className="author">{post.author}</p>
                    <p className="date">{post.date}</p>
                  </div>
                </div>
                <span className="time">{post.readTime}</span>
              </div>

              <div className="blogCard-badges">
                {post.tags.map((tag) => (
                  <Badge key={`${post.id}-${tag}`} className="blogCard-badge">
                    {tag}
                  </Badge>
                ))}
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Blog;
