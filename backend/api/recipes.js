import express from "express";
import {searchRecipes, getRecipe} from "../spoonacular/queries.js";
import {getRecipeById} from "../database/recipe-dao.js";

const router = express.Router();

router.get("/", async (req, res) => {

    const searchQuery = {};
    req.query.recipeQuery && (searchQuery.query = req.params.recipeQuery);
    req.query.cuisine && (searchQuery.cuisine = req.query.cuisine);
    req.query.diet && (searchQuery.diet = req.query.diet);
    req.query.intolerances && (searchQuery.intolerances = req.query.intolerances);
    req.query.type && (searchQuery.type = req.query.type);
    req.query.maxReadyTime && (searchQuery.maxReadyTime = req.query.maxReadyTime);
    req.query.number && (searchQuery.number = req.query.number);
    req.query.offset && (searchQuery.offset = req.query.offset);

    res.json(searchRecipes(searchQuery));
});

router.get("/:recipeId", async (req, res) => {
    const recipeId = req.params.recipeId;
    let recipe = await getRecipeById(recipeId);

    if (recipe) {
        res.json(recipe).status(200).send();
    } else {
        res.json(getRecipe(recipeId)).status(200).send();
    }
});