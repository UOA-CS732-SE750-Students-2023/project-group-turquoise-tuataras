import { Button } from 'antd';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function FavoriteButton({ recipe , userData , favoriteStatus , setFavoriteStatus}) {

    

    const insertSavedRecipe = async () => {
        
        // add the selected SavedRecipe to databse , then refresh favoriteStatus
        const addNewSavedRecipeData = await axios.post(
              `${API_BASE_URL}/users/${userData.id}/savedRecipes`, { recipieId: recipe.spoonacularId} )
              .then(()=> setFavoriteStatus(true));
      };

    const deleteSavedRecipe = async () => {

        // delete the selected SavedRecipe to databse , then refresh favoriteStatus
        const deleteNewSavedRecipeData = await axios.delete(
            `${API_BASE_URL}/users/${userData.id}/savedRecipes`, { recipieId: recipe.spoonacularId} )
            .then(()=> setFavoriteStatus(false));
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

  