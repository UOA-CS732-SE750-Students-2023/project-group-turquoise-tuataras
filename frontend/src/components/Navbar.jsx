import React, { useState } from 'react';
import icon from '../images/icon.png'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './app/App.css';
import { useLogout } from '../hooks/useLogout.js'
import { useAuthContext } from '../hooks/useAuthContext.js'

function NavBar({onSignUpShow, onLogInShow}) {

  const handleSearch = (event) => {
    event.preventDefault();
    const searchValue = event.target.elements.search.value.trim();
    if (searchValue) {
      const searchUrl = `/search?query=${encodeURIComponent(searchValue)}`;
      window.location.href = searchUrl;
    } else {
      const searchUrl = `/search`;
      window.location.href = searchUrl;
    }
  }

  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }

  return (
    <Navbar className='navbar_color' expand="lg">
      <Container>
        <Navbar.Brand href="/"><img src={icon} width="200"></img></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          {user && (
            <>
              <Nav.Link href={user ? "/saved-recipes" : null} className="navbar_link">
                Saved Recipes
              </Nav.Link>
              <Nav.Link href={user ? "/meal-schedule" : null} className="navbar_link">
                Meal Schedule
              </Nav.Link>
            </>
          )}
        </Nav>
        </Navbar.Collapse>
        <form className="navbar_form" onSubmit={handleSearch}>
          <input type="text" name="search" placeholder="Search" className="navbar_input" />
          <button type="submit" className="navbar_button">Search</button>
        </form>
        <Navbar.Collapse className="justify-content-end">
          {user ? (
            <>
              <NavDropdown className="navbar_username" title={user.username} id="basic-nav-dropdown">
                <NavDropdown.Item href={`/profile?user=${user.username}`}>
                    My Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleClick}>
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