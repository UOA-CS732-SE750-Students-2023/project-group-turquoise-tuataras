import express from "express";
import {searchRecipes, getRecipeBySpoonacularId} from "../../spoonacular/queries.js";
import {createRecipe, getRecipeById} from "../../database/dao/recipe-dao.js";
import {getIntolerances, userData} from "../../database/dao/user-dao.js";

const router = express.Router();

router.get("/search", async (req, res) => {
    const { recipeQuery, cuisines, diet, userId, type, maxReadyTime, number, offset } = req.query;
    const searchQuery = {};
    recipeQuery && (searchQuery.query = recipeQuery);
    cuisines && (searchQuery.cuisines = cuisines.toString());
    diet && (searchQuery.diet = diet.join('|'));
    userId && (searchQuery.intolerances = getIntolerances(userId).toString());
    type && (searchQuery.type = type);
    maxReadyTime && (searchQuery.maxReadyTime = maxReadyTime);
    number && (searchQuery.number = number);
    offset && (searchQuery.offset = offset);
    const res1 = await searchRecipes(searchQuery)
    res.json(res1);
});

router.get("/recommendations", async (req, res) => {
    const { userName } = req.query;

    const commonQuery = {};
    commonQuery.number = 10;
    commonQuery.sort = 'random';

    if(userName) {
        const {savedRecipes, intolerances} = await userData(userName);
        let cuisines = [];
        savedRecipes.forEach(recipe => {
            cuisines = [...new Set([cuisines, ...recipe.cuisines])];
        });

        commonQuery.cuisines = cuisines.toString();
        commonQuery.intolerances = intolerances.toString();
    }
    const recommendations = {};
    const mealTypes = ["main course", "side dish", "dessert", "appetizer", "salad", "bread", "breakfast",
        "soup", "beverage", "fingerfood", "snack", "drink"]
        .sort(() => 0.5 - Math.random()).slice(0, 3);
    for (const mealType of mealTypes) {
        recommendations[mealType] = await searchRecipes({...commonQuery, type: mealType});
    }

    res.json(recommendations);
});

router.get("/:spoonacularId", async (req, res) => {
    const spoonacularId = req.params.spoonacularId;
    let recipe = await getRecipe(spoonacularId, false);

    if (recipe) {
        res.json(recipe).status(200);
    } else {
        res.status(404).json({"message": `Recipe with spoonacular ID: ${spoonacularId} not found`});
    }
});

router.post('/:spoonacularId/comment', async (req, res) => {
    const { spoonacularId } = req.params;
    const comment = req.body;
    const recipe = await getRecipe(spoonacularId, true);
    if (recipe){
        recipe.comments.push({
            username: comment.username,
            comment: comment.comment
        });
        recipe.save();
        res.status(201).json(comment);
    }
    else{
        res.status(404).json({"message": `Recipe with spoonacular ID: ${spoonacularId} not found`});
    }
});

router.post('/:spoonacularId/rating', async (req, res) => {
    const { spoonacularId } = req.params;
    const rating = req.body.rating;
    const recipe = await getRecipe(spoonacularId, true);
    if (recipe){
        const newCalculatedRating = (recipe.rating.rating*recipe.rating.numberOfRatings + rating)/(recipe.rating.numberOfRatings + 1);
        const newRating = {
            rating: newCalculatedRating,
            numberOfRatings: recipe.rating.numberOfRatings+1
        };
        recipe.rating = newRating;
        await recipe.save();
        res.status(201).json({
            "message": "New rating: " + newCalculatedRating
        });
    }
    else{
        res.status(404).json({"message": `Recipe with spoonacular ID: ${spoonacularId} not found`});
    }
});

async function getRecipe(spoonacularId, createIfNotExists = false) {
    let recipe = await getRecipeById(spoonacularId);
    if (recipe) {
        return recipe;
    }

    if(createIfNotExists) {
        return createRecipe(spoonacularId);
    }
    return getRecipeBySpoonacularId(spoonacularId);
}

export default router;