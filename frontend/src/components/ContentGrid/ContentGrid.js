import React, { useState, useEffect } from "react";
import ContentCard from "./contentCard";
import "./ContentGrid.css";
import axios from 'axios';

  // API service
export const getListings = async (searchParams) => {
    const options = {
      method: 'GET',
      url: 'https://airbnb19.p.rapidapi.com/api/v1/searchPropertyByPlace',
      params: {
        id: 'ChIJ7cv00DwsDogRAMDACa2m4K8',
        display_name: 'Chicago, IL',
        totalRecords: '10',
        currency: 'USD',
        adults: '1'
      },
      headers: {
        'x-rapidapi-key': 'a880a9a9dfmsh627a3f34020e7d2p1614c2jsnd2e4119a7e11',
        'x-rapidapi-host': 'airbnb19.p.rapidapi.com'
      }
    };
    
    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  

function ContentGrid({ listingsParam = [] }) {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const data = await getListings({
          location: 'Brussels',
          checkin: '2024-12-01',
          checkout: '2024-12-07',
          adults: 2
        });
        setListings(data);
        console.log(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {[1, 2, 3].map((n) => (
          <div key={n} className="animate-pulse">
            <div className="h-48 bg-gray-200 rounded-t-lg"></div>
            <div className="p-4 bg-white rounded-b-lg">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
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
    <div className="contentGrid">
        {/* {listings.map(listing => (
          <ContentCard 
            key={listing.id} 
            listing={listing}
          />
        ))} */}
      </div>  
  );
}

export default ContentGrid;