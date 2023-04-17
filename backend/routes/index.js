import express from "express";
import { User } from "../database/user-schema";
import { Recipe } from '../database/recipe-schema';
import { ScheduledRecipe } from "../database/scheduled-recipe-schema";

const router = express.Router();

router.get('/users', async (req, res) => {
    const users = await User.find({})
    .populate('savedRecipes')
    const filteredUsers = users.map(({ id, username, savedRecipes }) => ({ id, username, savedRecipes }));
    res.json(filteredUsers);
});


router.get('/scheduledRecipes', async (req, res) => {
    const recipes = await ScheduledRecipe.find({})
    .populate('recipe').populate('user');
    if (recipes) return res.json(recipes);
    return res.sendStatus(404);
});

export default router;