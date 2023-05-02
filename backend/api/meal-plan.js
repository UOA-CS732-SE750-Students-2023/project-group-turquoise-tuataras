import express from 'express';
import { 
    getMealPlanByUserAndCurrentWeek,
    createDayMealPlan,
    updateDayMealPlan,
    deleteDayMealPlanRecipe } from '../database/dao/meal-plan-dao.js';
import moment from 'moment'

const router = express.Router();

// Todo: Implement JWT so that userId in req body isn't needed

// Retrieve the user's meal plan for the current week
router.get('/', async (req, res) => {
    const { userId } = req.body;

    const startOfWeek = moment().utc().isoWeekday(1).startOf('day');
    const endOfWeek = moment().utc().isoWeekday(7).endOf('day');

    const mealPlan = await getMealPlanByUserAndCurrentWeek(userId, startOfWeek, endOfWeek);
    res.json(mealPlan);
})

// Create new day meal plan
router.post('/', async (req, res) => {

    const newDayMealPlan = await createDayMealPlan(req.body);

    if (newDayMealPlan) return res.status(201).json(newDayMealPlan)
    return res.sendStatus(422)
})

// Update day meal plan
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const dayMealPlan = req.body;
    dayMealPlan._id = id;

    const success = await updateDayMealPlan(dayMealPlan)
    res.sendStatus(success ? 204 : 404);
})

// Delete day meal plan
router.delete('/:id/:recipeId', async (req, res) => {
    const { id, recipeId } = req.params;
    const success = await deleteDayMealPlanRecipe(id, recipeId);
    res.sendStatus(success ? 204 : 404);
})

export default router;