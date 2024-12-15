import React from 'react';
import ContentCard from './contentCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import './contentPage.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Listing {
  id: string;
  name: string;
  price: { total: number; currency: string; rate: number };
  rating: number;
  hostThumbnail: string;
  reviewsCount: number;
  address: string;
  isFavorite: boolean;
}

interface ContentPageProps {
  query: string | null; // Define the query prop
  priceRange: { min: string; max: string }; // Price range filter
}

const ContentPageResult: React.FC<ContentPageProps> = ({ query, priceRange }) => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchListings = async () => {
    try {
      const params = {
        query,
        minPrice: priceRange.min,
        maxPrice: priceRange.max,
      };

      const response = await axios.get('/listings', { params }); // Use GET with query parameters
      setListings(response.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings(); // Fetch listings when component mounts or query/priceRange changes
  }, [query, priceRange]);

  return (
      <div className="content-page-container">
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        {!loading && listings.length === 0 && <div>No results found for your search.</div>} {/* Show message for no results */}
        <div className="row">
          {listings.map((listing) => (
              <div key={listing.id} className="col-12 mb-4">
                <ContentCard listing={listing} isHorizontal={true} />
              </div>
          ))}
        </div>
      </div>
  );
};

export default ContentPageResult;