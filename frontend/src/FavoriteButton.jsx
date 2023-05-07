import React, { useState, useEffect } from "react";
import { Button, Tooltip, Drawer} from 'antd';
import axios from 'axios';

export function FavoriteButton({recipe , onChangeFavorite , users }) {

    const [favoriteStatus, setFavoriteStatus] = useState( getRecipeSavedStatus(recipe,users) );

    const insertSavedRecipe = async () => {
        setFavoriteStatus(true);
        // add the selected SavedRecipe to databse , then call the refresh favorite
        const addNewSavedRecipeData = await axios.post(
              `http://localhost:3000/api/users/savedrecipes/${users[0].id}`, recipe)
              .then(()=> onChangeFavorite());
      };

    const deleteSavedRecipe = async () => {
        setFavoriteStatus(false);
            // delete the selected SavedRecipe to databse , then call the refresh favorite
        const deleteNewSavedRecipeData = await axios.post(
            `http://localhost:3000/api/users/deleteSavedrecipes/${users[0].id}`, recipe)
            .then(()=> onChangeFavorite());
    };
  
    return (      
        (favoriteStatus) ?
        <Button type="primary" onClick={deleteSavedRecipe}  
        style={{background: "#b0aeb0"}}>remove Favorite</Button>
        :
        <Button type="primary" onClick={insertSavedRecipe}  
        style={{background: "#83a459"}}>add Favorite</Button>
    )
  }  

export function getRecipeSavedStatus (recipeData , userData) {

        for (let i = 0; i < (userData[0].savedRecipes.length); i++) {
            if((recipeData._id) === (userData[0].savedRecipes[i])){
                return true;
            }
        }
    
        return false;
}

  