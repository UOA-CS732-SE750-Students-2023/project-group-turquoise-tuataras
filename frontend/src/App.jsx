import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import Navbar from './Navbar'
import Auth from './Auth';

function App() {

  //handle showing auth modal
  const [authModalShow, setauthModalShow] = useState(false);

  const handleAuthModalClose = () => setauthModalShow(false);
  const handleAuthModalShow = () => setauthModalShow(true);


  return (
    <div>
        <Navbar onShow={handleAuthModalShow}/>
        <Auth show={authModalShow} onHide={handleAuthModalClose}/>
    </div>
  )
}

export default App
