import express from "express";
import {User} from "../database/user-schema.js";
import {createRecipe, getRecipeById} from "../database/recipe-dao.js";

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

    let recipe = await getRecipeById(spoonacularRecipeId);

    if (recipe === null) {
        recipe = await createRecipe(spoonacularRecipeId);
    }
    const user = await User.findById(userId);

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

    const recipe = await getRecipeById(spoonacularRecipeId);

    const user = await User.findById(userId);

    if(user) {
        user.savedRecipes.pull(recipe);
        await user.save();
        res.status(201).send();
    } else {
        res.status(404).send();
    }
});
