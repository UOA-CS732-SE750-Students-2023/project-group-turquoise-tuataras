import { Button } from 'antd';
import axios from 'axios';
import { useAuthContext } from './hooks/useAuthContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function FavoriteButton({ recipe , favoriteStatus , setFavoriteStatus}) {

    const { user, loading} = useAuthContext()

    // add the selected SavedRecipe to databse , then refresh favoriteStatus
    const insertSavedRecipe = async () => {
        
        try {
            const response = await axios.post(`${API_BASE_URL}/users/savedRecipes`, {
                recipeId: recipe.spoonacularId
            }, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            setFavoriteStatus(true);
            } catch (err) {
            console.error(err);
        }
    };

    const deleteSavedRecipe = async () => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/users/savedRecipes`, {
                data: { recipeId: recipe.spoonacularId },
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            setFavoriteStatus(false);
        } catch (err) {
            console.error(err);
        }
    };
  
    return (      
        (favoriteStatus) ?
        <Button type="primary" onClick={deleteSavedRecipe}
        style={{width:"6rem"}} ghost danger>Remove</Button>
        :
        <Button type="primary" onClick={insertSavedRecipe}  
        style={{width:"6rem"}} ghost>Add</Button>
    )
  } 

  