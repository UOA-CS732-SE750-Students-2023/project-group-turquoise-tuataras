import * as dotenv from 'dotenv'
dotenv.config();
import express from "express";
import { User } from "../database/user-schema";
import { DayMealPlan } from "../database/day-meal-plan-schema";
import { Recipe } from "../database/recipe-schema";
import mongoose from 'mongoose';

await mongoose.connect(process.env.MONGODB_CONNECTION_STRING, { useNewUrlParser: true });
const router = express.Router();

router.get('/users', async (req, res) => {
    const users = await User.find({});
    const filteredUsers = users.map(({ id, username, savedRecipes, ratedRecipes }) => ({ id, username, savedRecipes, ratedRecipes }));
    res.json(filteredUsers);
});

export default router;