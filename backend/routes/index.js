import * as dotenv from 'dotenv'
dotenv.config();
import express from "express";
import { User } from "../database/user-schema";
import { DayMealPlan } from "../database/day-meal-plan-schema";
import { Recipe } from "../database/recipe-schema";
import mongoose from 'mongoose';
import { updateRecipe , getRecipeById } from '../database/recipe-dao';

await mongoose.connect(process.env.MONGODB_CONNECTION_STRING, { useNewUrlParser: true });
const router = express.Router();

router.get('/users', async (req, res) => {
    const users = await User.find({});
    const filteredUsers = users.map(({ id, username, savedRecipes, ratedRecipes }) => ({ id, username, savedRecipes, ratedRecipes }));
    res.json(filteredUsers);
});

router.get('/recipes', async (req, res) => {
    const recipes = await Recipe.find({});
    res.json(recipes);
});

router.get('/recipeComment/:spoonacularId', async (req, res) => {
    const { spoonacularId } = req.params;

    const ricipeComment = await Recipe.findOne({spoonacularId});
    
    if (ricipeComment) return res.json(ricipeComment);
    return res.sendStatus(404);
});

router.get('/recipeComment/:spoonacularId', async (req, res) => {
    const { spoonacularId } = req.params;

    const ricipeComment = await Recipe.findOne({spoonacularId});
    
    if (ricipeComment) return res.json(ricipeComment);
    return res.sendStatus(404);
});

// Update Recipe with new comment
router.put('/updateComment/:spoonacularId', async (req, res) => {
    const { spoonacularId } = req.params;
    const recipe = req.body;
    recipe.spoonacularId = spoonacularId;

    const success = await updateRecipe(recipe);
    res.sendStatus(success ? 204 : 404);
});



// add new  SavedRecipe with user
router.post("/users/savedrecipes/:userId", async (req, res) => {
    const userId = req.params.userId;

    const savedRecipe = req.body;

    let recipe = await getRecipeById(savedRecipe.spoonacularId);

    if (recipe === null) {
        recipe = await createRecipe(spoonacularId);
    }
    const user = await User.findById(userId);

    if(user) {
        user.savedRecipes.addToSet(recipe);
        await user.save();
        res.status(201).send();
    } else {
        res.status(404).send();
    }

});


// delete selected SavedRecipe with user
router.post("/users/deleteSavedrecipes/:userId", async (req, res) => {
    const userId = req.params.userId;
    const deleteSavedRecipe = req.body;

    const recipe = await getRecipeById(deleteSavedRecipe.spoonacularId);

    const user = await User.findById(userId);

    console.log("user =",user);
    console.log("recipe =",recipe);

    if(user) {
        user.savedRecipes.pull(recipe);
        await user.save();
        res.status(201).send();
    } else {
        res.status(404).send();
    }
});

export default router;