import React, {useState, useEffect} from "react";
import axios from "axios";
import SavedReceipeCard from './SavedReceipeCard';
import {useAuthContext} from './hooks/useAuthContext';
import styles from './SavedRecipePage.module.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function SavedRecipePage() {

    const {user, loading} = useAuthContext();

    const [favoriteStatus, setFavoriteStatus] = useState(true);

    // Retrieve SavedRecipe Data ---- start

    const [savedRecipes, setSavedRecipes] = useState(null);

    useEffect(() => {
        async function fetchSavedRecipes() {
            try {
                const response = await axios.get(`${API_BASE_URL}/users/savedRecipes`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                })

                setSavedRecipes(response.data);
                setFavoriteStatus(true);
                
            } catch (err) {
                console.error(err);
            }
        }

        fetchSavedRecipes();
    }, [favoriteStatus]);

    // Retrieve SavedRecipe Data ----- end]

    return (
        <div>
            {(Array.isArray(savedRecipes) && savedRecipes.length === 0) ? (<div className = {styles.nosavedrecipe}><h1> No Saved Recipes! </h1></div>) :

            (savedRecipes && user) ?
                (<div>
                        <div className={styles.productContainer}>
                            {savedRecipes.map((recipe) => (
                                <SavedReceipeCard key={recipe.spoonacularId}
                                                  item={recipe}
                                                  favoriteStatus={favoriteStatus}
                                                  setFavoriteStatus={setFavoriteStatus}/>
                            ))}
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
            <img src="Loading_icon.gif"/>
        )
    }
}