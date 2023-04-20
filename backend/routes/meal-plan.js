import express from 'express';
import { 
    createDayMealPlan,
    updateDayMealPlan,
    deleteDayMealPlan } from '../database/meal-plan-dao';

const router = express.Router();

router.post('/', async (req, res) => {

    const newDayMealPlan = await createDayMealPlan(req.body);

    if (newDayMealPlan) return res.status(201).json(newDayMealPlan)
    return res.sendStatus(422)
})

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const dayMealPlan = req.body;
    dayMealPlan._id = id;

    const success = await updateDayMealPlan(dayMealPlan)
    res.sendStatus(success ? 204 : 404);
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await deleteDayMealPlan(id);
    res.sendStatus(204)
})

export default router;