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
import { useAuthContext } from './hooks/useAuthContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function App() {
  const [signUpModalShow, setSignUpModalShow] = useState(false);

  const handleSignUpModalClose = () => setSignUpModalShow(false);
  const handleSignUpModalShow = () => setSignUpModalShow(true);

  const [logInModalShow, setLogInModalShow] = useState(false);

  const handleLogInModalClose = () => setLogInModalShow(false);
  const handleLogInModalShow = () => setLogInModalShow(true);

  const { user } = useAuthContext()

  const handleReset = (username, password) => {
    axios.patch(`${API_BASE_URL}/users/reset`,{
      username,
      password
    }, {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })
  };

  const handleIntolerances = (intolerances) => {
    const user = JSON.parse(localStorage.getItem("user"));
    localStorage.setItem(user.username + "_intolerances", JSON.stringify(intolerances));
    axios.put(`${API_BASE_URL}/users/intolerances`,
      intolerances, {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })
  };

  return (
    <BrowserRouter>
      <div>
        <Navbar onSignUpShow={handleSignUpModalShow} onLogInShow={handleLogInModalShow}/>
        <SignUp show={signUpModalShow} onHide={handleSignUpModalClose}/>
        <Login show={logInModalShow} onHide={handleLogInModalClose}/>
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