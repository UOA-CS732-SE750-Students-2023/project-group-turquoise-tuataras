import { useParams } from 'react-router-dom';
import RecipeCard from './ReceipeCard';

export default function SingleRecipePage({recipes , recipesIsLoading , onChangeComment}) {

    const { id } = useParams();

    function retrieveRecipeBySpoonacularId(id) {
        return recipes.find(a => a.spoonacularId === parseInt(id));
    }

    if (recipesIsLoading) {
        return null;
    }

    else {
        return (
            
            <div>
                <RecipeCard key={parseInt(id)} item= {retrieveRecipeBySpoonacularId(id)} onChangeComment= {onChangeComment}/>
            </div>
        );
    }
}