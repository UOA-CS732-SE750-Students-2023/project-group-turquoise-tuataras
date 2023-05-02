import { Recipe } from "./recipe-schema";

async function updateRecipe(recipe) {

    const dbRecipe = await Recipe.findOneAndUpdate
    ({ spoonacularId: recipe.spoonacularId }, recipe);
    
    return dbRecipe !== undefined;
}

export {
    updateRecipe
}