import React from "react";
import { Home01Icon } from "hugeicons-react";

import './TitleLogo.css';

function TitleLogo() {
    return (
      <div className="TitleLogo">
        <Home01Icon className="homeIcon" size={36} /> 
        
        <h1 className="font-bold">SwitchAroom</h1>
      </div>
    );
}

export default TitleLogo;