import React, { useContext, useEffect  } from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import { MdLanguage } from "react-icons/md";
import { Home01Icon } from 'hugeicons-react';
import { UserContext } from "../../context/userContext";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

import "./TopNav.css";


import TitleLogo from "../TitleLogo/TitleLogo";

function TopNav() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const logout = async (e) => {
    e.preventDefault();
      const response = await axios.post('/logout');
      setUser(null);
      navigate('/home');
  };
  
  const login = async (e) => {
    e.preventDefault();
    navigate('/login');
  }
  const register = async (e) => {
    e.preventDefault();
    navigate('/register');
  }

  useEffect(() => {
    console.log('Current user:', user);
  }, [user]);
  
  return (
    <Navbar className="navBar navbar-expand-lg">
      <TitleLogo />
      <Nav className="me-auto NavLinks">
        <Nav.Link className="NavText" href="../home">
          Home
        </Nav.Link>
        <Nav.Link className="NavText" href="../home">
          Browse
        </Nav.Link>
        <Nav.Link className="NavText" href="../home">
          Co-housing
        </Nav.Link>
        <Nav.Link hidden={user == null} className="NavText" href="../account">
          Account
        </Nav.Link>
      </Nav>
      <Nav className="rightNavButtons NavLinks">  
        <form onSubmit={logout}>
        <Button hidden={user == null} className="NavButton" as="input" type="submit" value="Logout" />
        </form>
        <form onSubmit={login}>
         <Button hidden={user != null} className="NavButton" type="submit" as="input" value="Login"/>
        </form>
        <form onSubmit={register}>
        <Button
          hidden={user != null} 
          className="NavButton"
          type="submit"
          as="input"
          value="Register"
          />
        </form>
        <div className="languageSelector">
        <MdLanguage />
        </div>
      </Nav>
    </Navbar>
  );
}

export default TopNav;
