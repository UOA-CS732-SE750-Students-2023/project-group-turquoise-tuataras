import {useState,useEffect} from 'react';
import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export default function SavedRecipePage() {

    const [recipes, setRecipes] = useState([]);
    
    function retrieveRecipeBySpoonacularId(id) {
        return recipes.find(a => a.spoonacularId === parseInt(id));;
    }
    }, [fetchResults]);

    const handleFetchRecipe = async () => {
   
        try {
          const response = await axios.get(`http://localhost:3000/api/recipes`);
          setFetchResults(response.data);
          console.log(response.data);
        } catch (err) {
          console.error(err);
        }

    };

    handleFetchRecipe();

    return (
        <div>
            <h2>{recipes[0].title}</h2>
        </div>
    );
}
