import express from "express";
import { User } from "../database/user-schema";
import { Recipe } from '../database/recipe-schema';
import { ScheduledRecipe } from "../database/scheduled-recipe-schema";

const router = express.Router();

router.get('/users', async (req, res) => {
    const users = await User.find({})
    const filteredUsers = users.map(({ id, username, savedRecipes, ratedRecipes }) => ({ id, username, savedRecipes, ratedRecipes }));
    res.json(filteredUsers);
});


router.get('/scheduledRecipes', async (req, res) => {
    const recipes = await ScheduledRecipe.find({})
    .populate('recipe').populate('user');
    if (recipes) return res.json(recipes);
    return res.sendStatus(404);
});

router.get('/recipes/id/:id', async (req, res) => {
    const { id } = req.params;
    const recipe = await Recipe.findOne({'_id': id})
    if (recipe) return res.json(recipe);
    return res.sendStatus(404);
});

router.get('/recipes/spoonacularId/:spoonacularId', async (req, res) => {
    const { spoonacularId } = req.params;
    const recipe = await Recipe.findOne({'spoonacularId': spoonacularId});
    if (recipe) return res.json(recipe);
    return res.sendStatus(404);
});

export default router;