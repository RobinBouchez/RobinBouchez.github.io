import React, { useState, useEffect } from "react";
import Map, { Marker, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./Map.css";
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner';

function MapComponent() {
  const [locationData, setLocationData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const mockData = { data: { location: { longitude: 0, latitude: 0 } } };
    const fetchLocation = async () => {
      const options = {
        method: "GET",
        url: "https://ip-geo-location.p.rapidapi.com/ip/check",
        params: {
          format: "json",
          language: "en",
        },
        headers: {
          "x-rapidapi-key":
            "a880a9a9dfmsh627a3f34020e7d2p1614c2jsnd2e4119a7e11",
          "x-rapidapi-host": "ip-geo-location.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        setLocationData(response.data);
        setLoading(false);
        console.log(response.data);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchLocation();
  }, []);

  if (loading) {
    return <div>
      <Spinner animation="border" />
      <p>Getting map data</p>
      </div> 
  }

  return (
    <div className="map-container">
      {locationData && (
        <Map
          className="map"
          initialViewState={{
            longitude: locationData.location.longitude,
            latitude: locationData.location.latitude,
            zoom: 15,
          }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        >
          <NavigationControl position="top-left" />
          <Marker
            longitude={locationData.location.longitude}
            latitude={locationData.location.latitude}
            color="red"
          />
        </Map>
      )}
    </div>
  );
}

export default MapComponent;
