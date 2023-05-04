import express from "express";
import mealPlanRoutes from './meal-plan.js'
import recipeRoutes from './recipes.js'
import userRoutes from './users.js'
const router = express.Router();


router.use('/meal-plan', mealPlanRoutes)
router.use('/recipes', recipeRoutes)
router.use('/users', userRoutes)

export default router;