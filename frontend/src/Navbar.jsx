import React, { useState } from 'react';
import icon from './icon/icon.png'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import './App.css';
import { useLogout } from './hooks/useLogout'
import { useAuthContext } from './hooks/useAuthContext'

function NavBar({onSignUpShow, onLogInShow}) {

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

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
              <Nav.Link href={user ? "saved-recipes" : null} className="navbar_link">
                Saved Recipes
              </Nav.Link>
              <Nav.Link href={user ? "meal-schedule" : null} className="navbar_link">
                Meal Schedule
              </Nav.Link>
              <Nav.Link href={user ? "search" : null} className="navbar_link">
                Advance Search
              </Nav.Link>
            </>
          )}
        </Nav>
        </Navbar.Collapse>
        <form className="navbar_form">
          <input type="text" placeholder="Search" className="navbar_input" />
          <button type="submit" className="navbar_button">Search</button>
        </form>
        <Navbar.Collapse className="justify-content-end">
          {user ? (
            <>
              <NavDropdown className="navbar_username" title={user.username} id="basic-nav-dropdown">
                <NavDropdown.Item href={`profile?user=${user.username}`}>
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
