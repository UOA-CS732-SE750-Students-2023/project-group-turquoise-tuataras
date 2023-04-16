import React, { useState } from 'react';
import icon from './images/icon.png'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './App.css';

function navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Navbar className='navbar_color' expand="lg">
      <Container>
        <Navbar.Brand href="#home"><img src={icon} width="200"></img></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home" className="navbar_link">Saved Recipes</Nav.Link>
            <Nav.Link href="#link" className="navbar_link">Meal Schedule</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <form className="navbar_form">
          <input type="text" placeholder="Search" className="navbar_input" />
          <button type="submit" className="navbar_button">Search</button>
        </form>
        <Navbar.Collapse className="justify-content-end">
          {isLoggedIn ? (
            <>
              <NavDropdown className="navbar_username" title="Username" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">
                  My Profile
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  ...
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  ...
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4" onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </>
          ) : (
            <>
              <button className="login_button" onClick={handleLogin}>Login</button>
              <button className="signup_button">Sign Up</button>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default navbar;
