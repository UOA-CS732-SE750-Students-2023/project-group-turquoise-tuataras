import * as dotenv from 'dotenv'
dotenv.config();
import express from "express";
import { User } from "../database/user-schema";
import { DayMealPlan } from "../database/day-meal-plan-schema";
import { Recipe } from "../database/recipe-schema";
import mongoose from 'mongoose';
import { updateRecipe } from '../database/recipe-dao';

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

// Update Recipe
router.put('/updateComment/:spoonacularId', async (req, res) => {
    const { spoonacularId } = req.params;
    const recipe = req.body;
    recipe.spoonacularId = spoonacularId;

    const success = await updateRecipe(recipe);
    res.sendStatus(success ? 204 : 404);
});

export default router;