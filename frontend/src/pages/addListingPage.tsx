import React from "react";
import Container from 'react-bootstrap/Container';
import AddingListing from "../components/Listing/AddingListingForm";

function AddListingPage() {
  return (
    <Container fluid className="addListingPage">
      <div>
        <AddingListing />
      </div>
    </Container>
  );
}

export default AddListingPage;
