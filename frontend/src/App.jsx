import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar'
import SignUp from './SignUp';
import Login from './Login';
import Profile from './Profile';
import AdvanceSearch from './AdvanceSearch';
import LocationSearch from './LocationSearch';

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

  // const handleLogin = (username, password) => {
  //   localStorage.setItem("user", JSON.stringify(username));
  //   setIsLoggedIn(true);
  //   setLogInModalShow(false);
  //   setUser(username);
  // };

  const handleReset = (username, password) => {
    axios.put(`${API_BASE_URL}/api/reset`,{
      username,
      password
    })
  };

  const handleIntolerances = (intolerances) => {
    const userId = JSON.parse(localStorage.getItem("user"));
    localStorage.setItem(userId + "_intolerances", JSON.stringify(intolerances));
    axios.post(`${API_BASE_URL}/api/intolerances`,{
      intolerances
    })
  };

  // useEffect(() => {
  //   const currentUser = JSON.parse(localStorage.getItem("user"));
  //   if (currentUser) {
  //     setUser(currentUser);
  //     setIsLoggedIn(true);
  //   }
  // }, []);

  return (
    <BrowserRouter>
      <div>
        <Navbar isLoggedIn={isLoggedIn} onSignUpShow={handleSignUpModalShow} 
          onLogInShow={handleLogInModalShow} user={user}/>
        <SignUp show={signUpModalShow} onHide={handleSignUpModalClose}/>
        <Login show={logInModalShow} onHide={handleLogInModalClose} handleLogin={handleLogin}/>
        <Routes>
          <Route path="/search"
            element={<AdvanceSearch/>}/>
          <Route path="/profile"
            element={<Profile handleReset={handleReset} handleIntolerances={handleIntolerances}/>}/>
          <Route path="/"
            element={<p>Home Page</p>}/>
          <Route path="/stores-near-me" 
            element={<LocationSearch/>}/>
          <Route path="*"
            element={<p>404 Page</p>}/>
        </Routes>
      </div>
    </BrowserRouter>

  )
}

export default App