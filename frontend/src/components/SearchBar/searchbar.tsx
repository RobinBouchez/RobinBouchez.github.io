import React from "react";
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import { CiSearch } from "react-icons/ci";
import './searchbar.css'

function Searchbar() {
    return (
        <div className="search-bar">
        <Card className="search-card">
            <Card.Body>
                    <div className="searchbarWrapper">
                        <CiSearch className="absolute left-3 top-3 h-5 w-5" />
                        <input
                            type="text"
                            placeholder="University or City"
                        />
                    </div>
            </Card.Body>
            <div className="tabs-div">
                <Nav variant="tabs custom-tabs" defaultActiveKey="cardsLink">
                    <Nav.Item>
                        <Nav.Link eventKey="cardsLink">Card view</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="mapLink">Map view</Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
        </Card>
        </div>
    );
}

export default Searchbar;