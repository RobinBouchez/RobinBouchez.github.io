import axios from "axios";

const fetchReviews = async (userEmail) => {
  try {
    const response = await axios.get("/reviews", {
      params: { userEmail },
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Failed to fetch reviews:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export default fetchReviews;
