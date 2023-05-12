import express from "express";
import {createRecipe, getRecipeById} from "../../database/dao/recipe-dao.js";
import requireAuth from '../../middleware/requireAuth.js'
import { saveRecipe, deleteSavedRecipe, getSavedRecipes } from "../../database/dao/user-dao.js";

const router = express.Router({mergeParams: true});

// require auth for all saved-recipes routes
router.use(requireAuth)

/*
    Endpoint to get all saved recipes for a user
 */
router.get("/", async (req, res) => {
    let userId;
    try{userId = req.user._id;}
    catch{
        console.log("User is null");
        res.status(404).send("User not found");
        return;
    }
    const savedRecipes = await getSavedRecipes(userId);

    res.json(savedRecipes).status(200);

});

/*
    Endpoint to add a recipe to a user's saved recipes
 */
router.post("/", async (req, res) => {
    let userId;
    try{userId = req.user._id;}
    catch{
        console.log("User is null");
        res.status(404).send("User not found");
        return;
    }

    const spoonacularRecipeId = req.body.recipeId;
    let recipe = await getRecipeById(spoonacularRecipeId);

    if (recipe === null) {
        recipe = await createRecipe(spoonacularRecipeId);
    }
    await saveRecipe(userId, recipe);
    res.sendStatus(201);

});

/*
    Endpoint to delete a recipe from a user's saved recipes
 */
router.delete("/", async (req, res) => {
    let userId;
    try{userId = req.user._id;}
    catch{
        console.log("User is null");
        res.status(404).send("User not found");
        return;
    }

    const spoonacularRecipeId = req.body.recipeId;
    const recipe = await getRecipeById(spoonacularRecipeId);
    await deleteSavedRecipe(userId, recipe);
    res.sendStatus(204);

});

export default router;
