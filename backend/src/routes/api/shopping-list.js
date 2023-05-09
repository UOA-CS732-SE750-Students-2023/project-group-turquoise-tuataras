import express from 'express';
import { getShoppingListByUserAndCurrentWeek } from '../../database/dao/meal-plan-dao.js';
import moment from 'moment'
import requireAuth from '../../middleware/requireAuth.js'

const router = express.Router();

// require auth for all shopping-list routes
router.use(requireAuth)

// Retrieve the user's shopping list with dates for the current week
router.get('/', async (req, res) => {
    const userId = req.user._id;
    const startOfWeek = moment().utc().startOf('day');
    const endOfWeek = moment().utc().add(6, 'days').endOf('day');

    const shoppingList = await getShoppingListByUserAndCurrentWeek(userId, startOfWeek, endOfWeek);
    res.json(shoppingList);
})

export default router;