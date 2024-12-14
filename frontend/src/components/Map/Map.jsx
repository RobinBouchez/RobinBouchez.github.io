import React from "react";
import Map, { Marker, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./Map.css";
import Spinner from 'react-bootstrap/Spinner';


function MapComponent({ location }) {
  if (!location) {
    return <div>
    <Spinner animation="border" />
    <p>Getting map data</p>
    </div> 
  } else {
  return (
    <div className="mapContainer">
        <Map
          initialViewState={{
            longitude: location.longitude,
            latitude: location.latitude,
            zoom: 15,
          }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        >
          <NavigationControl position="top-left" />
          <Marker
            longitude={location.longitude}
            latitude={location.latitude}
            color="red"
          />
        </Map>
    </div>
  );
}
}

export default MapComponent;
