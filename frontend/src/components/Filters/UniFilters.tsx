import React, { useState, useEffect } from "react";
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';

import './filters.css'
import axios from 'axios';

// Define an interface for university type
interface University {
  Name: string;
  Logo: string;
}

function UniFilters() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [selectedCountry, setSelectedCountry] = React.useState('region');

  const handleSelect = (eventKey: string | null) => {
  if (eventKey) {
    setSelectedCountry(eventKey);
  }
  };

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
          Name: "Vrije Universiteit Brussel"
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
      url: 'https://university-data.p.rapidapi.com/api/v2/country/' + selectedCountry,
      headers: {
        'x-rapidapi-key': 'a880a9a9dfmsh627a3f34020e7d2p1614c2jsnd2e4119a7e11',
        'x-rapidapi-host': 'university-data.p.rapidapi.com'
      }
    };

    try {
      if(selectedCountry != "region") {
      const response = await axios.request(options);
      setUniversities(response.data);
      } else {
        const response = mockResponse;
        setUniversities(response.data);
      }
    } catch (error) {
      console.error(error);
    }
    
  }
  fetchUniversities();
    
  }, [selectedCountry]);



  return (
    <div>
    <h2>Find popular universities in your
    <Dropdown drop="end" onSelect={handleSelect}>
    <Dropdown.Toggle className="dropdownButton" style={{ backgroundColor: 'inherit', borderColor: 'inherit', color: 'inherit' }}>
      {selectedCountry}
    </Dropdown.Toggle>
    <Dropdown.Menu>
      <Dropdown.Item eventKey="Belgium">Belgium</Dropdown.Item>
      <Dropdown.Item eventKey="United States">United States</Dropdown.Item>
      <Dropdown.Item eventKey="France">France</Dropdown.Item>
    </Dropdown.Menu>
    </Dropdown>
  </h2>
    <ul className="filterNav">
      {universities.map((uni, index) => (
      <li key={index} className="filterNavItem" >
        <img src={uni.Logo} alt={uni.Name} className="filterLogo"/> 
        {/* <a className="filterLink" href="/">{uni.Name}</a> */}
      </li>
      ))}
    </ul>

    </div>
  );
}

export default UniFilters;



