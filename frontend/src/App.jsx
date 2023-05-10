import './App.css'
import SavedRecipePage from "./SavedRecipePage";
import SingleRecipePage from "./SingleRecipePage";
import ShoppingList from "./ShoppingList";
import { useContext } from 'react';
import { AppContext } from './AppContextProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar'
import SignUp from './SignUp';
import Login from './Login';
import Profile from './Profile';
import AdvanceSearch from './AdvanceSearch';
import LocationSearch from './LocationSearch';
import Alerts from './Alerts';
import { useAuthContext } from './hooks/useAuthContext';
import MealSchedule from "./MealSchedule.jsx";
import HomePage from "./HomePage.jsx";

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

  // ToDo: Provide feedback when a loading state is present
  // when loading show a blank screen
  if (loading) {
    return
  }

  const { recipes, recipesIsLoading , users , onChangeFavorite} = useContext(AppContext);
  
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
          <Route path="/savedRecipes"
            element={<SavedRecipePage onChangeFavorite={onChangeFavorite} />}/>
          <Route path="/shoppingList"
            element={<ShoppingList />}/>
          <Route path="/recipes/:spoonacularId"
            element={<SingleRecipePage recipes = {recipes} users = {users} recipesIsLoading = {recipesIsLoading} onChangeFavorite={onChangeFavorite} />} />
          <Route path="*"
            element={<p>404 Page</p>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
