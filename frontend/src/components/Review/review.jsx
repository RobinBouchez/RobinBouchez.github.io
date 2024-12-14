import React, { useState, useContext } from "react";
import { Star } from "lucide-react"; // Replace with your actual Star component import
import Button from "react-bootstrap/Button";
import axios from 'axios';
import { UserContext } from "../../context/userContext";

function Reviews({ dormData }) {
  const { user } = useContext(UserContext);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    userEmail: '',
    rating: 0,
    text: "",
    dateAdded: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    console.log("submin reviews started in frontend", newReview);
    e.preventDefault();
    try {
      newReview.userEmail = user.email;
      const date = new Date();
      newReview.dateAdded = date.toISOString();

      const response = await axios.post('/listing', newReview);

      console.log(response.data.message);
    } catch (error) {
      console.error('Failed to add review:', error.response?.data?.message || error.message);
    }
    setNewReview({ rating: 0, text: "" }); // Clear the form
    setShowReviewForm(false); // Hide the form after submission
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-6">Student Reviews</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {dormData.reviews.map((review, index) => (
          <div key={index} className="border rounded-lg p-4">
            <div className="flex items-center mb-2">
              <h3 className="font-semibold mr-4">{review.name}</h3>
              <div className="flex text-yellow-500">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={20} fill="currentColor" />
                ))}
              </div>
            </div>
            <p className="text-gray-700">{review.text}</p>
          </div>
        ))}
      </div>

      {/* Add Review Button */}
      <div>
        {user && ( // Only render this block if user is not null
          <>
            <br />
            <Button
              className="NavButton"
              onClick={() => setShowReviewForm(!showReviewForm)}
            >
              {showReviewForm ? "Cancel" : "Add Review"}
            </Button>
          </>
        )}
      </div>

      {/* Add Review Form */}
      {showReviewForm && (
        <div className="mt-4">
          <div className="mb-4">
            <label htmlFor="rating" className="block font-semibold mb-1">
              Rating:
            </label>
            <select
              id="rating"
              name="rating"
              value={newReview.rating}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
              required
            >
              <option value="" disabled>
                Select Rating
              </option>
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num} Star{num > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="text" className="block font-semibold mb-1">
              Review:
            </label>
            <textarea
              id="text"
              name="text"
              value={newReview.text}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
              rows="4"
              required
            />
          </div>
          <Button onClick={handleFormSubmit} type="submit" className="NavButton">
            Submit Review
          </Button>
        </div>
      )}
    </div>
  );
}

export default Reviews;
