import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Nav from 'react-bootstrap/Nav';

import { CiMenuBurger } from "react-icons/ci";

import './Menu.css'

function Menu() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className='menuButton'>
        <CiMenuBurger onClick={handleShow} />
      </div>

      <Offcanvas className="menuWrapper" show={show} onHide={handleClose} backdrop={false} scroll={true}>
        <Offcanvas.Header closeButton></Offcanvas.Header>
        <Offcanvas.Body>
          <Nav defaultActiveKey="/home" className="flex-column customStyleNavText">
            <Nav.Link className='NavLink' href="/home">Home</Nav.Link>
            <Nav.Link className='NavLink'>Profile</Nav.Link>
            <Nav.Link className='NavLink'>Chat</Nav.Link>
            <Nav.Link className='NavLinkBottom'>Logout</Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Menu;