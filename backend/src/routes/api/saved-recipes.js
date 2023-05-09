import express from "express";
import {User} from "../../database/schema/user-schema.js";
import {createRecipe, getRecipeById} from "../../database/dao/recipe-dao.js";
import requireAuth from '../../middleware/requireAuth.js'

const router = express.Router({mergeParams: true});

// require auth for all saved-recipes routes
router.use(requireAuth)

router.get("/", async (req, res) => {
    const userId = req.user._id;
    const user = await User
        .findById(userId)
        .populate("savedRecipes");

    if(user) {
        res.json(user.savedRecipes).status(200);
    } else {
        res.status(404);
    }
});

router.post("/", async (req, res) => {
    const userId = req.user._id;
    const spoonacularRecipeId = req.body.recipeId;

    let recipe = await getRecipeById(spoonacularRecipeId);

    if (recipe === null) {
        recipe = await createRecipe(spoonacularRecipeId);
    }
    const user = await User.findById(userId);

    if(user) {
        user.savedRecipes.addToSet(recipe);
        await user.save();
        res.status(201);
    } else {
        res.status(404);
    }

});

router.delete("/", async (req, res) => {
    const userId = req.user._id;
    const spoonacularRecipeId = req.body.recipeId;

    const recipe = await getRecipeById(spoonacularRecipeId);

    const user = await User.findById(userId);

    if(user) {
        user.savedRecipes.pull(recipe);
        await user.save();
        res.status(201);
    } else {
        res.status(404);
    }
});

export default router;
