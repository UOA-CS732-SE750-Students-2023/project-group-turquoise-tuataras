import express from "express";
import {searchRecipes, getRecipe} from "../../spoonacular/queries.js";
import {getRecipeById} from "../../database/dao/recipe-dao.js";
import {Recipe} from "../../database/schema/recipe-schema.js";
import {getIntolerances} from "../../database/dao/user-dao.js";

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

    res.json(searchRecipes(searchQuery));
});

router.get("/:spoonacularId", async (req, res) => {
    const spoonacularId = req.params.spoonacularId;
    let recipe = await getRecipeById(spoonacularId);

    if (recipe) {
        res.json(recipe).status(200).send();
    } else {
        res.json(getRecipe(spoonacularId)).status(200).send();
    }
});

router.post('/:spoonacularId/comment', async (req, res) => {
    const { spoonacularId } = req.params;
    const comment = req.body;
    const recipe = await Recipe.findOne({'spoonacularId': spoonacularId});
    if (recipe){
        recipe.comments.push({
            username: comment.username,
            comment: comment.comment
        });
        recipe.save();
        res.status(201).json(comment);
    }
    else{
        res.status(404).json({"message": "Recipe with that spoonacular ID not found"});
    }
});

router.post('/:spoonacularId/rating', async (req, res) => {
    const { spoonacularId } = req.params;
    const rating = req.body.rating;
    const recipe = await Recipe.findOne({'spoonacularId': spoonacularId});
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
        res.status(404).json({"message": "Recipe with that spoonacular ID not found"});
    }
});

export default router;