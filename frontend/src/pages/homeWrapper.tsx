
import React from "react";

import './homeWrapper.css'

import TopNav from '../components/TopNav/TopNav';
import Searchbar from "../components/SearchBar/searchbar";

import Footer from "../components/Footer/footer";
import ProfileConfig from "../components/ProfileConfig/conf";
import { Outlet } from 'react-router-dom';


function HomeWrapper() {

  return (
    <div className="App">
      <div className="profileConfigButton">
        {/* <ProfileConfig /> */}
      </div>
      <nav className="header">
          <TopNav />
        <div className="searchbar">
          <Searchbar />
        </div>
      </nav>
      <div className='MainWrapper'>
       <Outlet />
      </div>
      <footer className="footer">
        <Footer />
      </footer>
    </div>

  );
}

export default HomeWrapper;