import express from 'express';
import { 
    getMealPlanByUserAndCurrentWeek,
    createDayMealPlan,
    updateDayMealPlan,
    deleteDayMealPlanRecipe } from '../../database/dao/meal-plan-dao.js';
import moment from 'moment'
import requireAuth from '../../middleware/requireAuth.js'

const router = express.Router();

// require auth for all meal-plan routes
router.use(requireAuth)
/*
    Retrieve the user's meal plan for the current week
 */
router.get('/', async (req, res) => {
    let userId;
    try{userId = req.user._id}
    catch{
        console.log("User is null");
        res.status(404).send("User not found")
    }

    const startOfWeek = moment().utc().startOf('day');
    const endOfWeek = moment().utc().add(6, 'days').endOf('day');

    const mealPlan = await getMealPlanByUserAndCurrentWeek(userId, startOfWeek, endOfWeek);
    res.json(mealPlan);
})
/*
    Create new day meal plan
 */
router.post('/', async (req, res) => {
    let userId;
    try{userId = req.user._id}
    catch{
        console.log("User is null");
        res.status(404).send("User not found")
        return;
    }
    const newDayMealPlan = req.body
    newDayMealPlan.user = userId
    const dayMealPlan = await createDayMealPlan(newDayMealPlan);

    if (dayMealPlan) return res.status(201).json(dayMealPlan)
    return res.sendStatus(422)
})
/*
    Update day meal plan
 */
router.patch('/:id', async (req, res) => {
    let userId;
    try{userId = req.user._id}
    catch{
        console.log("User is null");
        res.status(404).send("User not found")
        return;
    }
    const { id } = req.params;
    const dayMealPlan = req.body;
    dayMealPlan._id = id;

    const success = await updateDayMealPlan(dayMealPlan)
    res.sendStatus(success ? 204 : 404);
})

// Delete day meal plan
router.delete('/:id/:recipeId', async (req, res) => {
    let userId;
    try{userId = req.user._id}
    catch{
        console.log("User is null");
        res.status(404).send("User not found")
        return;
    }
    const { id, recipeId } = req.params;
    const success = await deleteDayMealPlanRecipe(id, recipeId);
    res.sendStatus(success ? 204 : 404);
})

export default router;