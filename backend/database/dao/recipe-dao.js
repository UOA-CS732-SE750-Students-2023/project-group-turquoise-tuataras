import {Recipe} from "../schema/recipe-schema.js";
import {getRecipeBySpoonacularId} from "../../spoonacular/queries.js";

export async function getRecipeById(recipeId) {
    const recipe = await Recipe.findOne({spoonacularId: recipeId});
    return recipe;
}

export async function createRecipe(spoonacularRecipeId) {
    const recipe = await getRecipeBySpoonacularId(spoonacularRecipeId);
    const newRecipe = new Recipe({
        ...recipe,
        rating: {
            rating: 0,
            numberOfRatings: 0
        },
        comments: []
    });
    const createdRecipe = await newRecipe.save();
    console.log("Created recipe: " + createdRecipe)
    return createdRecipe;
}