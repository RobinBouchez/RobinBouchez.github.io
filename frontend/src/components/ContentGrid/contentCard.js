import React from 'react';
import { FaRegStar, FaBed, FaBath } from "react-icons/fa";
import PropTypes from 'prop-types';

import './contentCard.css'

const ContentCard = ({ listing }) => {
  const {
    id,
    name,
    price = 150,
    rating = 4.5,
    reviewCount = 128,
    imageUrl = "/api/placeholder/400/300",
    location = "Boulder, Colorado",
    isFavorite = false,
    onFavoriteClick,
  } = listing || {};

  const handleImageError = (e) => {
    e.target.src = "/api/placeholder/400/300"; // Fallback image
  };

  return (
    <div className="content-card overflow-hidden shadow-lg bg-white ">
      {/* Image Container */}
      <div className="">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full"
          onError={handleImageError}
          loading="lazy"
        />
      </div>

      
      <div className="bottomCard">
        {/* Header with Rating */}
          <div>
            <FaRegStar className="h-4 w-4 text-pink-500 mr-1" />
            <span className="text-sm text-gray-600">
              {rating.toFixed(1)} ({reviewCount.toLocaleString()} reviews)
            </span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-lg mb-1 text-gray-900">
          {name}
        </h3>

        {/* Location */}
        <p className="text-gray-600 text-sm mb-2">{location}</p>

        {/* Price */}
          <span className="text-lg font-semibold">
            ${price.toLocaleString()}
          </span>
          <span className="text-gray-600 text-sm ml-1">/ night</span>
        </div>
    </div>
  );
};

ContentCard.propTypes = {
  listing: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    rating: PropTypes.number,
    reviewCount: PropTypes.number,
    imageUrl: PropTypes.string,
    location: PropTypes.string,
    isFavorite: PropTypes.bool,
    onFavoriteClick: PropTypes.func,
  })
};

export default ContentCard;