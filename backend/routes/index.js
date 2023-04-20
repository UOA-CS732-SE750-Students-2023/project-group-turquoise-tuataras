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

router.post('/recipe/:spoonacularId/rating', async (req, res) => {
    const { spoonacularId } = req.params;
    const rating = req.body.rating;
    const recipe = await Recipe.findOne({'spoonacularId': spoonacularId});
    if (recipe){
        const newCalculatedRating = (recipe.rating.rating*recipe.rating.numberOfRatings + rating)/(recipe.rating.numberOfRatings + 1);
        const newRating = {
            rating: newCalculatedRating,
            numberOfRatings: recipe.rating.numberOfRatings+1
        };
        recipe.rating = newRating;
        await recipe.save();
        res.status(201).json({
            "message": "New rating: " + newCalculatedRating
        });
    }
    else{
        res.status(404).json({"message": "Recipe with that spoonacular ID not found"});
    }
});

router.post('/users/:username/intolerances', async (req, res) => {
    const { username } = req.params;
    const intolerances = req.body;
    const user = await User.findOne({'username': username});
    if (user){
        user.intolerances = intolerances;
        await user.save();
        res.status(201).json({
            "message": "Intolerances updated"
        });
    }
    else{
        res.status(404).json({"message": "User with username " + username + " not found"});
    }
});

export default router;