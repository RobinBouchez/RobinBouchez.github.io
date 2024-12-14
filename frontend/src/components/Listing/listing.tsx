import React, { useState } from "react";
import {
  MapPin,
  BedDouble,
  DollarSign,
  Users,
  Shield,
  Star,
} from "lucide-react";
import ImageCarousel from "../ImageCarousel/imageCarousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./listing.css";
import MapComponent from "../Map/Map";
import BookingComponent from "./BookingForm";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Reviews from "../Review/review.jsx";

const Listing = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);

  const navigate = useNavigate();

  const addListinglink = async () => {
    navigate("/addlisting");
  };

  interface Review {
    name: string;
    rating: number;
    text: string;
  }

  const addReview = (newReview: Review) => {
    console.log("New Review Submitted:", newReview);
    alert(
      `Review added successfully!\nName: ${newReview.name}\nRating: ${newReview.rating}\nReview: ${newReview.text}`
    );
  };

  const dormData = {
    id: 1,
    name: "University Towers",
    address: "123 Campus Drive, College Town, ST 12345",
    description:
      "Modern student housing with premium amenities and a vibrant community atmosphere. Located just steps away from campus with easy access to academic buildings, dining, and recreation.",
    price: 1200,
    images: [
      "/api/placeholder/600/400",
      "/api/placeholder/600/400",
      "/api/placeholder/600/400",
    ],
    location: {
      latitude: 42.2808,
      longitude: -83.7430
    },
    amenities: [
      { icon: "wifi", name: "High-Speed Internet" },
      { icon: "bed", name: "Fully Furnished Rooms" },
      { icon: "washing-machine", name: "In-Building Laundry" },
      { icon: "parking", name: "Free Parking" },
      { icon: "utensils", name: "Shared Kitchen" },
      { icon: "shield", name: "24/7 Security" },
    ],
    roomTypes: [
      {
        type: "Shared Double",
        capacity: 2,
        price: 1200,
        size: "250 sq ft",
        features: [
          "Two twin XL beds",
          "Shared desk and storage",
          "Closet space for two",
        ],
      },
      {
        type: "Private Single",
        capacity: 1,
        price: 1500,
        size: "150 sq ft",
        features: ["Single twin XL bed", "Personal desk", "Individual closet"],
      },
    ],
  };

  const reviewData = {
    reviews: [
      {
        name: "Emily R.",
        rating: 5,
        text: "Amazing dorm with great facilities and friendly staff. The study lounges are perfect for group projects!",
      },
      {
        name: "Michael T.",
        rating: 4,
        text: "Comfortable living space with everything I need. The location is super convenient for classes.",
      },
    ],
  };

  return (
    <div className="listing container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>go back</div>

        <ImageCarousel />

        {/* Dorm Details */}
        <div>
          <Container fluid>
            <Row>
              <h1>{dormData.name}</h1>
              <Col>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="mr-2" />
                  <span>{dormData.address}</span>
                </div>

                <p className="text-gray-700 mb-6">{dormData.description}</p>

                <div className="amenities">
                  <h2>Amenities</h2>
                  <div className="amenities-grid">
                    {dormData.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center">
                        <span className="mr-3">
                          <BedDouble />{" "}
                        </span>
                        <span>{amenity.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Col>
              <Col>
                <div className="BookingOptions">
                  <BookingComponent />
                  <div></div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>


      <div>
        <h2>Availability</h2>
        {/* Apply Button */}
        <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
          Apply for Housing
        </button>

        <div className="mapComp">
          <h2>Location</h2>
          <MapComponent location={dormData.location} />
        </div>

        {/* Reviews Section */}
        <div>
          <form>
            <Reviews dormData={reviewData} />
          </form>
        </div>
        <br />
        <div>
          <form onSubmit={addListinglink}>
            <Button
              className="NavButton"
              type="submit"
              as="input"
              value="Add listing"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Listing;
