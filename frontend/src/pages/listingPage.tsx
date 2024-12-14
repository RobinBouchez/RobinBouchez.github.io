import React from "react";
import Container from 'react-bootstrap/Container';
import Listing from "../components/Listing/listing";
import './listing.css';

function ListingPage() {
  return (
    <Container fluid className="ListingPage">
      <div>
        <Listing />
      </div>
    </Container>
  );
}

export default ListingPage;
