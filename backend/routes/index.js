import express from "express";
import mealPlanRoutes from './meal-plan.js'
import recipeRoutes from './recipes.js'
import userRoutes from './users.js'
import googleRoutes from './google.js'
const router = express.Router();

router.use('/meal-plan', mealPlanRoutes)
router.use('/recipes', recipeRoutes)
router.use('/users', userRoutes)
router.use('/google', googleRoutes)


export default router;