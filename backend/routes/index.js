import express from "express";

const router = express.Router();

import mealPlanRoutes from './meal-plan'
router.use('/meal-plan', mealPlanRoutes)

import userRoutes from './user'
router.use('/user', userRoutes)

export default router;