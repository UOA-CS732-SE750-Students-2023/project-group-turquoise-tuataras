import express from 'express';
import { createDayMealPlan } from '../database/meal-plan-dao';

const router = express.Router();

router.post('/', async (req, res) => {

    const newDayMealPlan = await createDayMealPlan(req.body);

    if (newDayMealPlan) return res.status(201).json(newDayMealPlan)

    return res.sendStatus(422)
})

export default router;