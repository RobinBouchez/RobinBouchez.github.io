import React, { useContext, useState } from "react";
import ImageCarousel from "../ImageCarousel/imageCarousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./listing.css";
import MapComponent from "../Map/Map";
import BookingComponent from "./BookingForm";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import axios from "axios";

const AddingListing = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [data, setData] = useState({
    city: "",
    country: "",
    street: "",
    houseNumber: 0,
    description: "",
    startDate: "",
    endDate: "",
    price: 0,
    userEmail: "",
    userID: "",
    dateAdded: "",
  });

  if (user == null) {
    navigate("/login"); // Redirect to login
    return <h1>Access Denied: Log in to add listings</h1>;
  } else {
    data.userEmail = user?.email;
    data.userID = btoa(`${user?.email}--${Date.now()}`);
    const date = new Date();
    data.dateAdded = date.toISOString();

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setData((prevData) => ({
        ...prevData,
        [name]: value, // Update state with the new value
      }));
    };

    const handleFileChange = (e) => {
      setSelectedFiles(e.target.files); // Multiple files are stored in `e.target.files`
    };

    const addListing = async (e) => {
      e.preventDefault();
      const formData = new FormData();

      // Add text fields
      formData.append("city", data.city);
      formData.append("country", data.country);
      formData.append("street", data.street);
      formData.append("houseNumber", data.houseNumber);
      formData.append("description", data.description);
      formData.append("startDate", data.startDate);
      formData.append("endDate", data.endDate);
      formData.append("price", data.price);
      formData.append("userEmail", user.email);
      formData.append("userID", data.userID);
      formData.append("dateAdded", data.dateAdded);

      // Add multiple files
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("images", selectedFiles[i]);
      }
      try {
        const response = await axios.post("/addlisting", formData, {
          headers: {
            "Content-Type": "multipart/form-data", // Ensure the correct headers
          },
        });
        if (response.data.error) {
          console.error(response.data.error);
        } else {
          console.log("Added listing successfully", response.data);
          navigate("/home");
        }
      } catch (error) {
        console.error("Failed to add listing", error);
      }
    };
    return (
      <div className="addListingForm">
        <form action="" onSubmit={addListing}>
          <h1>Add listing</h1>
          <div className="input-box">
            <p>
              City :
              <input
                type="text"
                name="city"
                placeholder="City"
                minLength={2}
                value={data.city}
                required
                onChange={handleInputChange}
              />
            </p>
            <p>
              Country :
              <input
                type="text"
                name="country"
                placeholder="Country"
                minLength={2}
                value={data.country}
                required
                onChange={handleInputChange}
              />
            </p>
            <p>
              Street :
              <input
                type="text"
                name="street"
                placeholder="Street"
                minLength={2}
                value={data.street}
                required
                onChange={handleInputChange}
              />
            </p>
            <p>
              House number :
              <input
                type="number"
                name="houseNumber"
                placeholder="House Number"
                min={1}
                value={data.houseNumber}
                required
                onChange={handleInputChange}
              />
            </p>
            <p>
              Start date :
              <input
                type="date"
                name="startDate"
                value={data.startDate}
                required
                onChange={handleInputChange}
              />
            </p>
            <p>
              End date :
              <input
                type="date"
                name="endDate"
                value={data.endDate}
                required
                onChange={handleInputChange}
              />
            </p>
            <p>
              Price :
              <input
                type="number"
                name="price"
                placeholder="Price"
                min={0}
                value={data.price}
                required
                onChange={handleInputChange}
              />
            </p>
            <textarea
              type="text"
              name="description"
              placeholder="Description"
              minLength={5}
              value={data.description}
              required
              onChange={handleInputChange}
            />
            <input
              type="file"
              name="images"
              multiple
              onChange={handleFileChange}
            />
          </div>
          <div>
            <button type="submit">Add room</button>
          </div>
        </form>
      </div>
    );
  }
};

export default AddingListing;
