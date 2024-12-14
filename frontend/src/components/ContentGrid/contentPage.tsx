import React, { useState, useEffect } from 'react';
import ContentGrid from './ContentGrid';

function ContentPage() {


  // useEffect(() => {
  //   const fetchListings = async () => {
  //     try {
  //       setLoading(true);
  //       const searchParams = {
  //         location: 'New York',
  //         checkin: '2024-12-01',
  //         checkout: '2024-12-07',
  //         adults: 2
  //       };
  //       const data = await getListings(searchParams);
  //       setListings(data);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchListings();
  // }, []);


  return <ContentGrid />;
}

export default ContentPage;