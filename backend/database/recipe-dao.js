import { Recipe } from "./recipe-schema";

async function updateRecipe(recipe) {

    const dbRecipe = await Recipe.findOneAndUpdate
    ({ spoonacularId: recipe.spoonacularId }, recipe);
    
    return dbRecipe !== undefined;
}

async function getRecipeById(recipeId) {
    const recipe = await Recipe.findOne({spoonacularId: recipeId});
    return recipe;
}

export {
    updateRecipe,
    getRecipeById
}