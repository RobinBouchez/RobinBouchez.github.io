import React from "react";
import { Home01Icon } from "hugeicons-react";
import { ReactComponent as Icon } from '../../switcharoom-logo.svg';
import { Link } from 'react-router-dom';

import './TitleLogo.css';

function TitleLogo() {
    return (
      <div className="TitleLogo">
        <Link to="/home" className="homeIcon">
          <Home01Icon className="homeIcon" href="/home"/> 
        </Link>
        
        <h1 className="font-bold">SwitchAroom</h1>
      </div>
    );
}

export default TitleLogo;