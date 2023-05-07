import React, { useState, useEffect } from "react";
import axios from "axios";
import SavedRecipeData from './SavedRecipeData.jsx'

export default function SavedRecipePage( {onChangeComment,onChangeFavorite} ) {

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

  return (
    <div>
      {(recipeData && userData) ?
        (  <div>
                <SavedRecipeData userData = {userData} recipeData = {recipeData} onChangeComment = {onChangeComment} onChangeFavorite={onChangeFavorite}/>
          </div>
        ) : 
        (
          <LoadingImage/>
        )}
    </div>
  );

  function LoadingImage() {
    return (
        <img src="Loading_icon.gif" />
    )
  }
}
