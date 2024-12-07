import React from "react";
import TopNav from '../components/TopNav/TopNav';
import MapComponent from "../components/Map/Map";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Searchbar from "../components/SearchBar/searchbar";

import './home.css'

import Footer from "../components/Footer/footer";
import ContentPage from "../components/ContentGrid/contentPage";
import UniFilters from "../components/Filters/UniFilters";
import QuestionsAccordion from "../components/QuestionsAcc/QuestionsAccordion";


function Home() {
  return (
    <div className="App">
      <nav className="header">
        <div className="navbar">
          <TopNav />
        </div>
        <div className="searchbar">
          <Searchbar />
        </div>
      </nav>
      <div className='MainWrapper'>
        <Container fluid className="PageContainer">
          <div className="universityFilters">
            <h2>Filter by university</h2>
            <UniFilters />
          </div>
          <Row className="row">
            <MapComponent />
            <Col>
              <div className="ContentGridCards">
               <ContentPage />
              </div>
            </Col>
            <Col>
              <div className="ContentGridCards">
               <ContentPage />
              </div>
            </Col>
            <Col>
              <div className="ContentGridCards">
               <ContentPage />
              </div>
            </Col>
          </Row> 
          <div className="block">
            <QuestionsAccordion />
          </div>

        </Container>

      </div>
      <div className="footer">
          <Footer />
        </div>
    </div>

  );
}

export default Home;