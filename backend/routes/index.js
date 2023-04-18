import express from "express";
import { User } from "../database/user-schema";
import { Recipe } from '../database/recipe-schema';
import { ScheduledRecipe } from "../database/day-meal-plan-schema";

const router = express.Router();

router.get('/users', async (req, res) => {
    const users = await User.find({})
    const filteredUsers = users.map(({ id, username, savedRecipes, ratedRecipes }) => ({ id, username, savedRecipes, ratedRecipes }));
    res.json(filteredUsers);
});

export default router;