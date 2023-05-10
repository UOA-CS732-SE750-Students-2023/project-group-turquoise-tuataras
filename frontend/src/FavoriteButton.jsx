import { Button } from 'antd';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function FavoriteButton({ recipe , user , favoriteStatus , setFavoriteStatus}) {

    // add the selected SavedRecipe to databse , then refresh favoriteStatus
    const insertSavedRecipe = async () => {
        
        try {
            const response = await axios.post(`${API_BASE_URL}/users/savedRecipes`, {
                recipieId: recipe.spoonacularId
            }, {
                headers: {
                Authorization: `Bearer ${user.token}`
                }
            })
            .then(()=> setFavoriteStatus(true));
        
            } catch (err) {
            console.error(err);
        }
    };

    const deleteSavedRecipe = async () => {

        // delete the selected SavedRecipe to databse , then refresh favoriteStatus
        try {
            const response = await axios.delete(`${API_BASE_URL}/users/savedRecipes`, {
                recipieId: recipe.spoonacularId
            }, {
                headers: {
                Authorization: `Bearer ${user.token}`
                }
            })
            .then(()=> setFavoriteStatus(false));
        
            } catch (err) {
            console.error(err);
        }
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

  