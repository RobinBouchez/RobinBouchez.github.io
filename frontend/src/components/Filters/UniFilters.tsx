import React, { useState, useEffect } from "react";
import Nav from 'react-bootstrap/Nav';
import './filters.css'
import axios from 'axios';

// Define an interface for university type
interface University {
  Name: string;
  Logo: string;
}

function UniFilters() {
  const [universities, setUniversities] = useState<University[]>([]);


  useEffect(() => {
    const fetchUniversities = async () => {
    // Mock data from previous response
    const mockResponse = {
      data: [
        {
          Name: "KU Leuven",
          Logo: "https://upload.wikimedia.org/wikipedia/commons/8/8e/KUL.svg"

        },
        { 
          Logo: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Braemtzegel.png",
          Name: "Ghent University"
        },
        {
          Logo: "https://upload.wikimedia.org/wikipedia/en/1/18/VUB_schild2.png",
          Name: "Vrije Universiteit Brussel (VUB, Free University of Brussels)"
        },
        {
          Logo: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Universiteit_Antwerpen_nieuw_logo.svg",
          Name: "University of Antwerp"
        },
        {
          Logo: "https://upload.wikimedia.org/wikipedia/en/0/05/Universit%C3%A9_libre_de_Bruxelles_seal.svg",
          Name: "Universite libre de Bruxelles (ULB)"
        }
      ]
    };

    const options = {
      method: 'GET',
      url: 'https://university-data.p.rapidapi.com/api/v2/country/Belgium',
      headers: {
        'x-rapidapi-key': 'a880a9a9dfmsh627a3f34020e7d2p1614c2jsnd2e4119a7e11',
        'x-rapidapi-host': 'university-data.p.rapidapi.com'
      }
    };

    try {
      const response = mockResponse; //await axios.request(options);
      setUniversities(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    
  }
  fetchUniversities();
    
  }, []);

  return (
    <Nav fill className="filterNav" variant="tabs">
      {universities.map((uni, index) => (
        <Nav.Item key={index} className="filterNavItem">
          <img src={uni.Logo} alt={uni.Name} className="filterLogo"/> 
          <Nav.Link className="filterLink">{uni.Name}</Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
}

export default UniFilters;