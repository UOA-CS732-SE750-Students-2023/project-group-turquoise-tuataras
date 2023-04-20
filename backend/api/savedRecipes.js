import express from "express";
import {User} from "../database/user-schema.js";
import {Recipe} from "../database/recipe-schema.js";
import {getRecipe} from "../spoonacular/queries.js";

const router = express.Router();

router.get("/users/:userId/savedRecipes", async (req, res) => {
    const userId = req.params.userId;
    const user = await User
        .findById(userId)
        .populate("savedRecipes");

    if(user) {
        res.json(user.savedRecipes).status(200).send();
    } else {
        res.status(404).send();
    }
});

router.post("/users/:userId/savedRecipes/:recipeId", async (req, res) => {
    const userId = req.params.userId;
    const spoonacularRecipeId = req.params.recipeId;

    let recipe = await Recipe
        .findOne({spoonacularId: spoonacularRecipeId});

    if (recipe === null) {
        const newRecipe = new Recipe({
            ...getRecipe(spoonacularRecipeId),
            rating: {
                rating: 0,
                numberOfRatings: 0
            },
            comments: []
        });
        newRecipe.save().then((newRecipe) => {
            recipe = newRecipe;
        });
    }
    const user = await User
        .findById(userId);

    if(user) {
        user.savedRecipes.push(recipe);
        await user.save();
        res.status(201).send();
    } else {
        res.status(404).send();
    }

});

router.delete("/users/:userId/savedRecipes/:recipeId", async (req, res) => {
    const userId = req.params.userId;
    const spoonacularRecipeId = req.params.recipeId;

    const recipe = await Recipe
        .findOne({spoonacularId: spoonacularRecipeId});

    const user = await User
        .findById(userId);

    if(user) {
        user.savedRecipes.pull(recipe);
        await user.save();
        res.status(201).send();
    } else {
        res.status(404).send();
    }
});
