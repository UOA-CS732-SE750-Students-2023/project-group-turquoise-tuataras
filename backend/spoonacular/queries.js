import axios from "axios";
import * as dotenv from "dotenv";
import * as fs from "fs";

dotenv.config();
const SPOONACULAR_URL = process.env.SPOONACULAR_URL ?? '';
const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY ?? '';

export function searchRecipes(query) {
    axios.get(`${SPOONACULAR_URL}/complexSearch`, {
        params: {
            apiKey: SPOONACULAR_API_KEY,
            ...query
        }
    })
        .then(response => {
          return response.data.results;
    })
        .catch(error => {
            console.log(error);
    })
}

export function getRecipe(id) {


    axios.get(`${SPOONACULAR_URL}/${id}/information`, {
        params: {
            apiKey: SPOONACULAR_API_KEY,
            includeNutrition: true,
        }
    })
        .then(response => {
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
                cuisines: recipe.cuisines,
                instructions: recipe.analyzedInstructions[0].steps.map(step => step.step)
            }
            return returnRecipe;
        })
        .catch(error => {
            console.log(error);
        })
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