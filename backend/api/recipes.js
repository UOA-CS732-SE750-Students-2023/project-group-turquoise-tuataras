import express from "express";
import {searchRecipes, getRecipe} from "../spoonacular/queries.js";
import {getRecipeById} from "../database/recipe-dao.js";
import {Recipe} from "../database/recipe-schema.js";

const router = express.Router();

router.get("/", async (req, res) => {

    const searchQuery = {};
    req.query.recipeQuery && (searchQuery.query = req.params.recipeQuery);
    req.query.cuisine && (searchQuery.cuisine = req.query.cuisine);
    req.query.diet && (searchQuery.diet = req.query.diet);
    req.query.intolerances && (searchQuery.intolerances = req.query.intolerances);
    req.query.type && (searchQuery.type = req.query.type);
    req.query.maxReadyTime && (searchQuery.maxReadyTime = req.query.maxReadyTime);
    req.query.number && (searchQuery.number = req.query.number);
    req.query.offset && (searchQuery.offset = req.query.offset);

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

router.post('/recipe/:spoonacularId/comment', async (req, res) => {
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

router.post('/recipe/:spoonacularId/rating', async (req, res) => {
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