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

                console.log(response.data)
                setSavedRecipes(response.data);
                console.log("savedRecipes = ", savedRecipes);
                console.log("user = ", user)
                setFavoriteStatus(true);
            } catch (err) {
                console.error(err);
            }
        }

        fetchSavedRecipes();
    }, [favoriteStatus]);

    // Retrieve SavedRecipe Data ----- end


    return (
        <div>
            {(savedRecipes && user) ?
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
                    <LoadingImage savedRecipes={savedRecipes}/>
                )}
        </div>
    );

    function LoadingImage({savedRecipes}) {

        let isSavedTecipe

        return (


            <img src="Loading_icon.gif"/>
        )
    }
}