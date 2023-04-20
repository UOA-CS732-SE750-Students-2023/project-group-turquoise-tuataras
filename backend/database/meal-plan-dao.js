import { DayMealPlan } from './day-meal-plan-schema'

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
    createDayMealPlan,
    updateDayMealPlan,
    deleteDayMealPlan
}