import React, { useState } from 'react';
import icon from './images/icon.png'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './App.css';

function NavBar({isLoggedIn, handleLogout, onSignUpShow, onLogInShow, user}) {

  const handleSearch = (event) => {
    event.preventDefault();
    const searchValue = event.target.elements.search.value.trim();
    if (searchValue) {
      const searchUrl = `/search?search=${encodeURIComponent(searchValue)}`;
      window.location.href = searchUrl;
    }
  }

  return (
    <Navbar className='navbar_color' expand="lg">
      <Container>
        <Navbar.Brand href="/"><img src={icon} width="200"></img></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href={isLoggedIn ? "saved-recipes" : null} className="navbar_link">
            Saved Recipes
          </Nav.Link>
          <Nav.Link href={isLoggedIn ? "meal-schedule" : null} className="navbar_link">
            Meal Schedule
          </Nav.Link>
          <Nav.Link href={isLoggedIn ? "advance-search" : null} className="navbar_link">
            Advance Search
          </Nav.Link>
        </Nav>
        </Navbar.Collapse>
        <form className="navbar_form" onSubmit={handleSearch}>
          <input type="text" name="search" placeholder="Search" className="navbar_input" />
          <button type="submit" className="navbar_button">Search</button>
        </form>
        <Navbar.Collapse className="justify-content-end">
          {isLoggedIn ? (
            <>
              <NavDropdown className="navbar_username" title={user} id="basic-nav-dropdown">
                <NavDropdown.Item href={`profile?user=${user}`}>
                    My Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </>
          ) : (
            <>
              <button className="login_button" onClick={onLogInShow}>Login</button>
              <button className="signup_button" onClick={onSignUpShow}>Sign Up</button>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
