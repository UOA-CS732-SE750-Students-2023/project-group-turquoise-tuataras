import RecipeCard from './ReceipeCard';
import styles from './RecipePage.module.css';


export default function RecipePage({ recipes , onChangeComment }) {
    
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
