import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Navbar from './Navbar'
import Auth from './Auth';
import AdvanceSearch from './AdvanceSearch';

function App() {

  //handle showing auth modal
  const [authModalShow, setauthModalShow] = useState(false);

  const handleAuthModalClose = () => setauthModalShow(false);
  const handleAuthModalShow = () => setauthModalShow(true);


  return (
    <BrowserRouter>
      <div>
        <Navbar onShow={handleAuthModalShow}/>
        <Auth show={authModalShow} onHide={handleAuthModalClose}/>
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
