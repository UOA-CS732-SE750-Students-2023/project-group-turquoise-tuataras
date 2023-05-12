import './App.css'
import SavedRecipePage from "../SavedRecipePage/SavedRecipePage.jsx";
import SingleRecipePage from "../SingleRecipePage/SingleRecipePage.jsx";
import ShoppingList from "../ShoppingList/ShoppingList.jsx";
import { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar.jsx'
import SignUp from '../SignUp.jsx';
import Login from '../Login.jsx';
import Profile from '../Profile.jsx';
import AdvanceSearch from '../AdvanceSearch.jsx';
import LocationSearch from '../LocationSearch/LocationSearch.jsx';
import Alerts from '../Alerts.jsx';
import { useAuthContext } from '../../hooks/useAuthContext.js';
import MealSchedule from "../MealSchedule/MealSchedule.jsx";
import HomePage from "../HomePage/HomePage.jsx";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function App() {

  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState("");
  const [alertMessage, setAlertMessage] = useState("")

  const handleAlert = (message, variant) => {
    setShowAlert(true);
    setAlertMessage(message);
    setAlertVariant(variant);
  }

  const [signUpModalShow, setSignUpModalShow] = useState(false);

  const handleSignUpModalClose = () => setSignUpModalShow(false);
  const handleSignUpModalShow = () => setSignUpModalShow(true);

  const [logInModalShow, setLogInModalShow] = useState(false);

  const handleLogInModalClose = () => setLogInModalShow(false);
  const handleLogInModalShow = () => setLogInModalShow(true);

  const { user, loading } = useAuthContext()

  const handleReset = async (username, password, user) => {
    try{
      const response = await axios.patch(`${API_BASE_URL}/users/reset`,{
        username,
        password
      }, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })

      // update username within local storage
      const updatedUser = response.data;
      const storedUser = JSON.parse(localStorage.getItem('user'));
      storedUser.username = updatedUser.username;
      localStorage.setItem('user', JSON.stringify(storedUser));
      handleAlert("Account Updated","success");
    } catch (error) {
      console.error(error)
      handleAlert(error.response.data.error,"danger");
    }
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
    handleAlert("Intolerances Updated","success")
  };

  const [ratingValue, setRatingValue] = useState(0);
  const handleRating = (value, recipeId) => {
    setRatingValue(value);
    axios.post(`${API_BASE_URL}/recipes/${recipeId}/rating`,
    {
      "rating": value
    }
    , {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })
  }

  if (loading) {
    return
  }
  
  return (
    <BrowserRouter>
      <div>
        <Navbar onSignUpShow={handleSignUpModalShow} onLogInShow={handleLogInModalShow}/>
        <Alerts showAlert={showAlert} setShowAlert={setShowAlert} alertVariant={alertVariant} alertMessage={alertMessage}/>
        <SignUp show={signUpModalShow} onHide={handleSignUpModalClose} setSignUpModalShow={setSignUpModalShow}/>
        <Login show={logInModalShow} onHide={handleLogInModalClose} setLogInModalShow={setLogInModalShow}/>
        <Routes>
          <Route path="/search"
            element={<AdvanceSearch/>}/>
          <Route path="/profile"
            element={user ? <Profile handleReset={handleReset} handleIntolerances={handleIntolerances}/> : <Navigate to="/" />}/>
          <Route path="/"
            element={<HomePage/>}/>
          <Route path="/stores-near-me"
            element={<LocationSearch/>}/>
          <Route path="/meal-schedule"
            element={user ? <MealSchedule/> : <Navigate to="/" />}/>
          <Route path="/saved-recipes"
            element={user ? <SavedRecipePage /> : <Navigate to="/" />}/>
          <Route path="/shopping-list"
            element={user ? <ShoppingList /> : <Navigate to="/" />}/>
          <Route path="/recipes/:spoonacularId"
            element={<SingleRecipePage handleRating={handleRating} />} />
          <Route path="*"
            element={<p>404 Page</p>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
