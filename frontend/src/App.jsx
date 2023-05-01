import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar'
import SignUp from './SignUp';
import Login from './Login';
import AdvanceSearch from './AdvanceSearch';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function App() {
  const [user, setUser] = useState("");

  const [signUpModalShow, setSignUpModalShow] = useState(false);

  const handleSignUpModalClose = () => setSignUpModalShow(false);
  const handleSignUpModalShow = () => setSignUpModalShow(true);

  const [logInModalShow, setLogInModalShow] = useState(false);

  const handleLogInModalClose = () => setLogInModalShow(false);
  const handleLogInModalShow = () => setLogInModalShow(true);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (username, password) => {
      axios.post(`${API_BASE_URL}/api/login`,{
        username,
        password
      })
      .then((response) => {
        if(response.status === 200) {
          localStorage.setItem("user", JSON.stringify(username));
          setIsLoggedIn(true);
          setLogInModalShow(false);
          setUser(username);
        } 
      })
    console.log(username);
    console.log(password);
  };

  const handleSignup = (username, password) => {
    axios.post(`${API_BASE_URL}/api/signup`,{
      username,
      password
    })
    .then((response) => {
      if(response.status === 200) {
        localStorage.setItem("user", JSON.stringify(username));
        setSignUpModalShow(false);
      } 
    })
  console.log(username);
  console.log(password);
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser("");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    if (currentUser) {
      setUser(currentUser);
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <div>
        <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} onSignUpShow={handleSignUpModalShow} onLogInShow={handleLogInModalShow} user={user}/>
        <SignUp show={signUpModalShow} onHide={handleSignUpModalClose} handleSignup={handleSignup}/>
        <Login show={logInModalShow} onHide={handleLogInModalClose} handleLogin={handleLogin}/>
        <Routes>
          <Route path="/advance-search"
            element={<AdvanceSearch/>}/>
          <Route path="/search"
            element={<p>Search Page</p>}/>
          <Route path="/"
            element={<p>Home Page</p>}/>
          <Route path="*"
            element={<p>404 Page</p>}/>
        </Routes>
      </div>
    </BrowserRouter>

  )
}

export default App