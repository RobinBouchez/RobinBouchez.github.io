import React, { useState, useEffect } from 'react';
import ContentGrid, { getListings } from './ContentGrid';

function ContentPage() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const searchParams = {
          location: 'New York',
          checkin: '2024-12-01',
          checkout: '2024-12-07',
          adults: 2
        };
        const data = await getListings(searchParams);
        setListings(data);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <ContentGrid listingsParam={listings} />;
}

export default ContentPage;