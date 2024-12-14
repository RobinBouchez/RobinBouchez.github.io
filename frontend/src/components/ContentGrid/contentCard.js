import React from 'react';
import { FaRegStar, FaBed, FaBath } from "react-icons/fa";
import PropTypes from 'prop-types';

import './contentCard.css'

const ContentCard = ({ listing }) => {
  const {
    id,
    name,
    price,
    rating,
    hostThumbnail,
    reviewsCount,
    images,
    address,
    isFavorite = false,
    onFavoriteClick,
  } = listing || {};

  const handleImageError = (e) => {
    e.target.src = "/api/placeholder/400/300"; // Fallback image
  };

  return (
    <div className="content-card">
      {/* Image Container */}
        <img
          src={hostThumbnail}
          alt={name}
          loading="lazy"
        />
      
      <div className="bottomCard">
          <div className='reviews'>
            <FaRegStar className="icon" />
            <span>
              {rating.toFixed(1)} ({reviewsCount} reviews)
            </span>
        </div>

        {/* Title */}
        <h1>
          {name}
        </h1>

        {/* Location */}
        <h2>{address}</h2>

        {/* Price */}
          <span className="price">
            ${price.total} / night
          </span>
        </div>
    </div>
  );
};

ContentCard.propTypes = {
  listing: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.shape({
      rate: PropTypes.number.isRequired,
      currency: PropTypes.string.isRequired,
      total: PropTypes.number.isRequired,
    }).isRequired,
    // Add other props as necessary
  }).isRequired,
};

export default ContentCard;