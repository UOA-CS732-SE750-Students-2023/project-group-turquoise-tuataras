import React, { useState, useEffect } from "react";
import axios from "axios";

import RecipeCard from './ReceipeCard';
import styles from './RecipePage.module.css';


export default function RecipePage({ onChangeComment , onChangeFavorite , users }) {

    const [recipeData, setRecipeData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          const response = await axios(
            'http://localhost:3000/api/recipes',
          );
          setRecipeData(response.data);
        };
        fetchData();
      }, [recipeData]);
    
    return (
        <div>
            {(recipeData) ? (
            <div className={styles.mainGrid}>
                <div className={styles.productContainer}>
                    {recipeData.map((recipe) => (
                        <RecipeCard key={recipe.spoonacularId} item= {recipe} users={users} 
                         onChangeComment= {onChangeComment} onChangeFavorite={onChangeFavorite}/>
                    ))}
                </div>
            </div>) : (
                <div/>
            )}
        </div>
    );
}
