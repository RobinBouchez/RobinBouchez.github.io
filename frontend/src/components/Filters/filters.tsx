import React from "react";
import Nav from 'react-bootstrap/Nav';

import './filters.css'
function Filters() {
  return (
    <Nav fill className="filterNav" variant="tabs">
      <Nav.Item className="filterNavItem">
        <Nav.Link className="filterLink">Filter by school</Nav.Link>
      </Nav.Item>
      <Nav.Item className="filterNavItem">
        <Nav.Link className="filterLink">Filter by place</Nav.Link>
      </Nav.Item>
      <Nav.Item className="filterNavItem">
        <Nav.Link className="filterLink">Filter by date</Nav.Link>
      </Nav.Item>
      <Nav.Item className="filterNavItem">
        <Nav.Link className="filterLink">Filter by price</Nav.Link>
      </Nav.Item>
      <Nav.Item className="filterNavItem">
        <Nav.Link className="filterLink">Filter by language</Nav.Link>
      </Nav.Item>
      <Nav.Item className="filterNavItem">
        <Nav.Link className="filterLink">Filter by distance</Nav.Link>
      </Nav.Item>
      <Nav.Item className="filterNavItem">
        <Nav.Link className="filterLink">Filter by reviews</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default Filters;