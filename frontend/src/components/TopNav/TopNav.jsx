import React, { useContext, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import { MdLanguage } from "react-icons/md";
import { Home01Icon } from "hugeicons-react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import Image from "react-bootstrap/Image";
import "./TopNav.css";

import TitleLogo from "../TitleLogo/TitleLogo";

function TopNav() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const logout = async (e) => {
    e.preventDefault();
    await axios.post("/auth/logout");
    setUser(null);
    navigate("/home");
  };

  const login = async (e) => {
    e.preventDefault();
    navigate("/login");
  };
  const register = async (e) => {
    e.preventDefault();
    navigate("/register");
  };

  useEffect(() => {
    console.log("Current user:", user);
  }, [user]);

  return (
    <Navbar className="navBar navbar-expand-lg">
      <TitleLogo />
      <Nav className="me-auto NavLinks">
        <Nav.Link className="NavText" href="../home">
          Home
        </Nav.Link>
        <Nav.Link className="NavText" href="../listing">
          Browse
        </Nav.Link>
        <Nav.Link className="NavText" href="../blog">
          Blog
        </Nav.Link>
        <Nav.Link className="NavText" href="../FAQ">
          FAQ
        </Nav.Link>
      </Nav>
      <Nav className="rightNavButtons NavLinks">
        <form onSubmit={logout}>
          <Dropdown drop="start" hidden={user == null}>
            <Dropdown.Toggle className="ProfileDropdown">
              {(user != null) && <Image src={user.profilePic} roundedCircle />}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/account" eventKey="account">
                Account
              </Dropdown.Item>
              <Dropdown.Item href="/messages" eventKey="messages">
                Chat
              </Dropdown.Item>
              <Dropdown.Item href="/addlisting">Add listing</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item as="button" type="submit">
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </form>
        <form onSubmit={login}>
          <Button
            hidden={user != null}
            className="NavButton"
            type="submit"
            as="input"
            value="Login"
          />
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
          <Dropdown drop="start">
            <Dropdown.Toggle className="ProfileDropdown">
              <MdLanguage className="languageIcon" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/#" eventKey="account">
                English
              </Dropdown.Item>
              <Dropdown.Item href="/#">Dutch</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Nav>
    </Navbar>
  );
}

export default TopNav;
