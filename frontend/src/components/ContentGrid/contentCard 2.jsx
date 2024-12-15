import React from 'react';
import { FaRegStar, FaBed, FaBath } from "react-icons/fa";
import PropTypes from 'prop-types';

import './contentCard.css'
import './contentCardHorz.css'

const ContentCard = ({ listing, isHorizontal = false }) => {
  const {
    id= "default",
    name="default",
    price= 999,
    rating= 9999,
    hostThumbnail="https://via.placeholder.com/150",
    reviewsCount= 999,
    images,
    address,
    isFavorite = false,
    onFavoriteClick,
  } = listing || {};
console.log('listing', listing);
  const handleImageError = (e) => {
    e.target.src = "/api/placeholder/400/300"; // Fallback image
  };

  const cardClass = isHorizontal ? 'content-card-horz' : 'content-card';  //To determine which css file to apply

  return (
    <div className={cardClass}>
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