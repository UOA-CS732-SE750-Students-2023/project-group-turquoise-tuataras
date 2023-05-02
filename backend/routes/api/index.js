import express from "express";
import { User } from "../../database/schema/user-schema.js";
import mealPlanRoutes from './meal-plan.js'
import recipeRoutes from './recipes.js'
import savedRecipesRoutes from './saved-recipes.js'
const router = express.Router();


router.use('/meal-plan', mealPlanRoutes)
router.use('/recipes', recipeRoutes)
router.use('/users/:userId/savedRecipes', savedRecipesRoutes)
router.put('/users/:username/intolerances', async (req, res) => {
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