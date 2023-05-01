import {Recipe} from "./recipe-schema.js";

export async function getRecipeById(recipeId) {
    const recipe = await Recipe.findOne({spoonacularId: recipeId});
    return recipe;
}