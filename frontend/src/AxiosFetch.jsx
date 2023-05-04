import React, { useState, useEffect } from "react";
import axios from "axios";
import SavedRecipeData from './SavedRecipeData.jsx'

export default function SavedRecipePage() {

  //Retrieve the users and recipes data automatically

  const [userData, setUserData] = useState(null);
  const [recipeData, setRecipeData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios(
        'http://localhost:3000/api/users',
      );
      setUserData(response.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios(
        'http://localhost:3000/api/recipes',
      );
      setRecipeData(response.data);
    };
    fetchData();
  }, []);


  //Set a conditonal statement to wait data receive
   
  return (
    <div>
      {(recipeData && userData) ?
        (  <div>
                <p>Data...</p>
                <SavedRecipeData userData = {userData} recipeData = {recipeData} />
          </div>
        ) : 
        (
          <p>Loading...</p>
        )}
    </div>
  );
}
