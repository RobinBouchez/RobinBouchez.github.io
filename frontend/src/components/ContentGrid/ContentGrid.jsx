import React, { useState, useEffect } from "react";
import ContentCard from "./contentCard";
import Spinner from "react-bootstrap/Spinner";
import "./ContentGrid.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import axios from "axios";

// API service
export const getListings = async () => {
  const mockResponse = {
    error: false,
    headers: {
      response_time: 780,
      response_timestamp: "2024-12-09T18:39:28.262Z",
      response_id: 28401067,
    },
    results: [
      {
        id: "1034594067790242581",
        url: "https://www.airbnb.com/rooms/1034594067790242581",
        deeplink:
          "https://www.airbnb.com/rooms/1034594067790242581?check_in=2025-01-12&check_out=2025-01-13&adults=1&children=0&infants=0&pets=0",
        position: 1,
        name: "Einzelzimmer am Kudamm",
        bathrooms: 1,
        bedrooms: 1,
        beds: 1,
        city: "Berlin",
        images: [
          "https://a0.muscache.com/im/pictures/miso/Hosting-1034594067790242581/original/8d2e70b1-2ad4-46de-be5f-bca7263bf63e.jpeg?im_w=720",
          "https://a0.muscache.com/im/pictures/miso/Hosting-1034594067790242581/original/0b16481d-3b7f-4452-a1c1-753db1380c71.jpeg?im_w=720",
          "https://a0.muscache.com/im/pictures/miso/Hosting-1034594067790242581/original/3361a650-f7a4-47b3-80b2-000a5b4e5ede.jpeg?im_w=720",
          "https://a0.muscache.com/im/pictures/miso/Hosting-1034594067790242581/original/9098af00-ec02-4a40-85b8-aee9a024578a.jpeg?im_w=720",
          "https://a0.muscache.com/im/pictures/miso/Hosting-1034594067790242581/original/7488108c-90c6-4d05-a073-b610510395f3.jpeg?im_w=720",
        ],
        hostThumbnail:
          "https://a0.muscache.com/im/pictures/user/7610ee97-6805-484f-ab0f-cfa8e4b6f677.jpg?aki_policy=profile_x_medium",
        isSuperhost: false,
        rareFind: false,
        lat: 52.503186379494714,
        lng: 13.33325427471215,
        persons: 1,
        reviewsCount: 44,
        rating: 4.48,
        type: "Room in hotel",
        userId: 230386042,
        address: "Berlin, Berlin, Germany",
        amenityIds: [
          1, 4, 137, 10, 77, 79, 146, 21, 85, 30, 287, 35, 611, 37, 39, 103, 40,
          104, 232, 107, 44, 45, 46, 51, 55,
        ],
        cancelPolicy: "CANCEL_MODERATE",
        price: {
          rate: 44,
          currency: "USD",
          total: 44,
          priceItems: [
            {
              title: "$44 x 1 night",
              amount: 44,
            },
          ],
        },
      },
      {
        id: "731825380030233334",
        url: "https://www.airbnb.com/rooms/731825380030233334",
        deeplink:
          "https://www.airbnb.com/rooms/731825380030233334?check_in=2025-01-12&check_out=2025-01-13&adults=1&children=0&infants=0&pets=0",
        position: 3,
        name: "limehome Berlin Luise-Henriette-Str. | Suite",
        bathrooms: 1,
        bedrooms: 1,
        beds: 1,
        city: "Berlin",
        images: "",
        hostThumbnail:
          "https://a0.muscache.com/im/pictures/user/0b5b504b-a884-41ac-ac2c-2700385f50a4.jpg?aki_policy=profile_x_medium",
        isSuperhost: false,
        rareFind: false,
        lat: 52.464195,
        lng: 13.384416,
        persons: 2,
        reviewsCount: 201,
        rating: 4.59,
        type: "Entire rental unit",
        userId: 418270816,
        address: "Berlin, Berlin, Germany",
        amenityIds: "",
        cancelPolicy: "CANCEL_MODERATE",
        price: "0",
      },
      {
        id: "41362381",
        url: "https://www.airbnb.com/rooms/41362381",
        deeplink:
          "https://www.airbnb.com/rooms/41362381?check_in=2025-01-12&check_out=2025-01-13&adults=1&children=0&infants=0&pets=0",
        position: 4,
        name: "bed in a hostel in Berlin centre",
        bathrooms: 1,
        bedrooms: 1,
        beds: 6,
        city: "Berlin",
        images: "",
        hostThumbnail:
          "https://a0.muscache.com/im/pictures/user/9b59fbff-3ceb-4650-ab77-bac1a7de3244.jpg?aki_policy=profile_x_medium",
        isSuperhost: false,
        rareFind: false,
        lat: 52.4983024597168,
        lng: 13.384405136108398,
        persons: 7,
        reviewsCount: 774,
        rating: 4.52,
        type: "Shared room in hostel",
        userId: 277288176,
        address: "Berlin, Berlin, Germany",
        amenityIds: "",
        cancelPolicy: "CANCEL_FLEXIBLE",
        price: "10",
      },
      {
        id: "41362381",
        url: "https://www.airbnb.com/rooms/41362381",
        deeplink:
          "https://www.airbnb.com/rooms/41362381?check_in=2025-01-12&check_out=2025-01-13&adults=1&children=0&infants=0&pets=0",
        position: 4,
        name: "bed in a hostel in Berlin centre",
        bathrooms: 1,
        bedrooms: 1,
        beds: 6,
        city: "Berlin",
        images: "",
        hostThumbnail:
          "https://a0.muscache.com/im/pictures/user/9b59fbff-3ceb-4650-ab77-bac1a7de3244.jpg?aki_policy=profile_x_medium",
        isSuperhost: false,
        rareFind: false,
        lat: 52.4983024597168,
        lng: 13.384405136108398,
        persons: 7,
        reviewsCount: 774,
        rating: 4.52,
        type: "Shared room in hostel",
        userId: 277288176,
        address: "Berlin, Berlin, Germany",
        amenityIds: "",
        cancelPolicy: "CANCEL_FLEXIBLE",
        price: "10",
      },
      {
        id: "41362381",
        url: "https://www.airbnb.com/rooms/41362381",
        deeplink:
          "https://www.airbnb.com/rooms/41362381?check_in=2025-01-12&check_out=2025-01-13&adults=1&children=0&infants=0&pets=0",
        position: 4,
        name: "bed in a hostel in Berlin centre",
        bathrooms: 1,
        bedrooms: 1,
        beds: 6,
        city: "Berlin",
        images: "",
        hostThumbnail:
          "https://a0.muscache.com/im/pictures/user/9b59fbff-3ceb-4650-ab77-bac1a7de3244.jpg?aki_policy=profile_x_medium",
        isSuperhost: false,
        rareFind: false,
        lat: 52.4983024597168,
        lng: 13.384405136108398,
        persons: 7,
        reviewsCount: 774,
        rating: 4.52,
        type: "Shared room in hostel",
        userId: 277288176,
        address: "Berlin, Berlin, Germany",
        amenityIds: "",
        cancelPolicy: "CANCEL_FLEXIBLE",
        price: "10",
      },
      {
        id: "945370095384488800",
        url: "https://www.airbnb.com/rooms/945370095384488800",
        deeplink:
          "https://www.airbnb.com/rooms/945370095384488800?check_in=2025-01-12&check_out=2025-01-13&adults=1&children=0&infants=0&pets=0",
        position: 2,
        name: "limehome Berlin Stresem. | Room-Wheelchair access",
        bathrooms: 1,
        bedrooms: 1,
        beds: 1,
        city: "Berlin",
        images: [
          "https://a0.muscache.com/im/pictures/miso/Hosting-945370095384488800/original/13c0e041-c018-4901-b8c4-d36f75800673.jpeg?im_w=720",
          "https://a0.muscache.com/im/pictures/miso/Hosting-945370095384488800/original/ebe5deeb-e881-4433-9249-a90369438fc7.jpeg?im_w=720",
          "... (and more)",
        ],
        hostThumbnail:
          "https://a0.muscache.com/im/pictures/user/0b5b504b-a884-41ac-ac2c-2700385f50a4.jpg?aki_policy=profile_x_medium",
        isSuperhost: false,
        rareFind: false,
        lat: 52.50092,
        lng: 13.3872948,
        persons: 2,
        reviewsCount: 40,
        rating: 4.7,
        type: "Entire rental unit",
        userId: 418270816,
        address: "Berlin, Berlin, Germany",
        amenityIds: [
          1, 4, 73, 137, 77, 79, 21, 85, 89, 90, 91, 93, 30, 94, 35, 611, 36,
          39, 40, 104, 41, 44, 236, 45, 51, 500, 53, 57, 251,
        ],
        cancelPolicy: "CANCEL_MODERATE",
        price: {
          rate: 66,
          currency: "USD",
          total: 66,
          priceItems: [
            {
              title: "$66 x 1 night",
              amount: 66,
            },
          ],
        },
      },
    ],
  };
  const options = {
    method: "GET",
    url: "https://airbnb13.p.rapidapi.com/search-location",
    params: {
      location: "Paris",
      checkin: "2025-01-12",
      checkout: "2025-01-13",
      adults: "1",
      children: "0",
      infants: "0",
      pets: "0",
      page: "1",
      currency: "USD",
    },
    headers: {
      "x-rapidapi-key": "a880a9a9dfmsh627a3f34020e7d2p1614c2jsnd2e4119a7e11",
      "x-rapidapi-host": "airbnb13.p.rapidapi.com",
    },
  };

  try {
    return mockResponse.results; //await axios.request(options);
  } catch (error) {
    console.error(error);
  }
};

function ContentGrid() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const data = await getListings();
        setListings(data);
      } catch (error) {
        setError(error.message);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  if (loading) {
    return (
      <div>
        <Spinner animation="border" />
        <p>Getting listing</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center">
        <div className="text-red-500 mb-2">Error loading listings</div>
        <div className="text-gray-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="contentContainer">
      <div className="arrow">
        <FaArrowLeft />
      </div>
      <div className="contentGrid">
        {listings.map((listing) => (
          <ContentCard key={listing.id} listing={listing} />
        ))}
      </div>
      <div className="arrow">
        <FaArrowRight />
      </div>
    </div>
  );
}

export default ContentGrid;
