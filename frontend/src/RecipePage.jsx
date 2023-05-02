import { useContext, useState } from 'react';
import { AppContext } from './AppContextProvider';
import RecipeCard from './ReceipeCard';
import styles from './RecipePage.module.css';


export default function RecipePage() {

    const { recipes , onChangeComment } = useContext(AppContext);

    return (
        <>
            <div className={styles.mainGrid}>
                <div className={styles.productContainer}>
                    {recipes.map((recipe) => (
                        <RecipeCard key={recipe.spoonacularId} item= {recipe} onChangeComment= {onChangeComment}/>
                    ))}
                </div>
            </div>
        </>
    );
}
