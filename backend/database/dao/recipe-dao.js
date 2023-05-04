import {Recipe} from "../schema/recipe-schema.js";
import {getRecipe} from "../../spoonacular/queries.js";

export async function getRecipeById(recipeId) {
    const recipe = await Recipe.findOne({spoonacularId: recipeId});
    return recipe;
}

export async function createRecipe(spoonacularRecipeId) {
    const newRecipe = new Recipe({
        ...getRecipe(spoonacularRecipeId),
        rating: {
            rating: 0,
            numberOfRatings: 0
        },
        comments: []
    });
    newRecipe.save().then((newRecipe) => {
        return newRecipe;
    });
}