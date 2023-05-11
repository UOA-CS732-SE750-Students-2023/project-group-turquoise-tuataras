import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();
const SPOONACULAR_URL = process.env.SPOONACULAR_URL ?? '';
const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY ?? '';


export async function searchRecipes(query) {
    const response = await axios.get(`${SPOONACULAR_URL}/complexSearch`, {
        params: {
            apiKey: SPOONACULAR_API_KEY,
            ...query
        }
    })
    return response.data.results;
}

export async function getRecipeBySpoonacularId(id) {

    const response = await axios.get(`${SPOONACULAR_URL}/${id}/information`, {
        params: {
            apiKey: SPOONACULAR_API_KEY,
            includeNutrition: true,
        }
    })

    const recipe = response.data;
    const returnRecipe = {
        spoonacularId: recipe.id,
        types: {
            vegetarian: recipe.vegetarian,
            vegan: recipe.vegan,
            glutenFree: recipe.glutenFree,
            dairyFree: recipe.glutenFree
        },
        ingredients: parseIngredients(recipe.extendedIngredients),
        title: recipe.title,
        image: recipe.image,
        readyInMinutes: recipe.readyInMinutes,
        servings: recipe.servings,
        nutrition: recipe.nutrition.nutrients,
        summary: recipe.summary,
        cuisines: recipe.cuisines
    }
    console.log(recipe.analyzedInstructions)
    if(recipe.analyzedInstructions[0]) {
        returnRecipe.instructions = recipe.analyzedInstructions[0].steps.map(step => step.step)
    }
    return returnRecipe;
}

function parseIngredients(extendedIngredients) {
    return extendedIngredients.map(ingredient => {
        return {
            name: ingredient.name,
            amount: ingredient.measures.metric.amount,
            unit: ingredient.measures.metric.unitLong
        }
    })
}