import express from "express";
import { User } from "../database/user-schema";
import { Recipe } from '../database/recipe-schema';
import { DayMealPlan } from "../database/day-meal-plan-schema";

const router = express.Router();

router.get('/users', async (req, res) => {
    const users = await User.find({})
    const filteredUsers = users.map(({ id, username, savedRecipes, ratedRecipes }) => ({ id, username, savedRecipes, ratedRecipes }));
    res.json(filteredUsers);
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

export default router;