import React, { useState, useEffect } from "react";
import axios from "axios";
import SavedReceipeCard from './SavedReceipeCard';
import { useAuthContext} from './hooks/useAuthContext';


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function SavedRecipePage( { userData } ) {
  
  const {user, loading} = useAuthContext();

  const [favoriteStatus, setFavoriteStatus] = useState(true);
  
  // Retrieve SavedRecipe Data ---- start

  const [savedRecipes, setSavedRecipes] = useState(null);

    useEffect( async () => {
        
          try {
            const response = await axios.get(`${API_BASE_URL}/saved-recipes`, {
            headers: {
              Authorization: `Bearer ${user.token}`
            }
          })    
            
            setSavedRecipes(response.data);
            console.log("savedRecipes = " , savedRecipes); 
            
            } catch (err) {
                console.error(err);
            }
    }, [favoriteStatus]);

  // Retrieve SavedRecipe Data ----- end

  return (
    <div>
      {(savedRecipes && userData) ?
          (  <div>
              <div className={styles.mainGrid}>
                  <div className={styles.productContainer}>
                      {savedRecipes.map((recipe) => (
                          <SavedReceipeCard key = {recipe.spoonacularId} 
                                            item = {recipe} 
                                            userData = {userData}
                                            favoriteStatus = {favoriteStatus}
                                            setFavoriteStatus ={ setFavoriteStatus}/>
                      ))}
                  </div>
              </div>
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
