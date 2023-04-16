import express from "express";
import { User } from "../database/user-schema";
import { Recipe } from '../database/recipe-schema';
import { Schedule } from '../database/schedule-schema';

const router = express.Router();

router.get('/users', async (req, res) => {
    const users = await User.find({})
    .populate('savedRecipes').populate('mealSchedule')
    const filteredUsers = users.map(({ id, username, savedRecipes, mealSchedule }) => ({ id, username, savedRecipes, mealSchedule }));
    res.json(filteredUsers);
});

router.get('/users/:name', async (req, res) => {
    const { name } = req.params;

    const user = await User.findOne()
    .populate('savedRecipes').populate('mealSchedule');
    if (user) return res.json(user);
    return res.sendStatus(404);
});

export default router;