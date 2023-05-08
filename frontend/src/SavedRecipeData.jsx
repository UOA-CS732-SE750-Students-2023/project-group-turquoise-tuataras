import React from "react";
import styles from './SavedRecipeData.module.css';
import SavedReceipeCard from './SavedReceipeCard';

export default function SavedRecipePage({userData , recipeData , onChangeFavorite}) {



    const savedRecipeData = getSavedRecipeData (userData , recipeData);

    return (
        <div>
            {(savedRecipeData) ? (
            <div className={styles.mainGrid}>
                <div className={styles.productContainer}>
                    {savedRecipeData.map((recipe) => (
                        <SavedReceipeCard key={recipe.spoonacularId} item= {recipe} users = {userData} 
                                           onChangeFavorite= { onChangeFavorite }/>
                    ))}
                </div>
            </div>) : (
                <div/>
            )}
        </div>
    );
}

export function getSavedRecipeData (userData , recipeData) {

    let savedRecipeArray = [];

        for (let i = 0; i < (userData[0].savedRecipes.length); i++) {
            const savedRecipe = recipeData.find(recipe => (recipe._id) === (userData[0].savedRecipes[i]));
            savedRecipeArray = [...savedRecipeArray,savedRecipe];
        }
    
        return savedRecipeArray
}


