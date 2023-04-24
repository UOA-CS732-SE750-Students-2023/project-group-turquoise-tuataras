import { DayMealPlan } from './day-meal-plan-schema'

async function getMealPlanByUserAndCurrentWeek(userId, start, end) {
    const mealPlan = await DayMealPlan.find({
        user: userId,
        dateTime: {
            $gte: start,
            $lte: end
        }
    }).populate('recipe');

    return mealPlan
}

async function createDayMealPlan(dayMealPlan) {

    const dbDayMealPlan = new DayMealPlan(dayMealPlan);
    await dbDayMealPlan.save();
    return dbDayMealPlan
}

async function updateDayMealPlan(dayMealPlan) {
    try {
        const dbDayMealPlan = await DayMealPlan.findOneAndUpdate({_id: dayMealPlan._id}, dayMealPlan);
        return !!dbDayMealPlan;
    } catch (error) {
        return false
    }
    
}

async function deleteDayMealPlan(id) {
    await DayMealPlan.deleteOne({ _id: id})
}

export {
    getMealPlanByUserAndCurrentWeek,
    createDayMealPlan,
    updateDayMealPlan,
    deleteDayMealPlan
}