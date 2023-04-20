import express from "express";

const router = express.Router();

import mealPlanRoutes from './meal-plan'
router.use('/meal-plan', mealPlanRoutes)

export default router;