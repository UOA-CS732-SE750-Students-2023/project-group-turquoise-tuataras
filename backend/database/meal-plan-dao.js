import { DayMealPlan } from './day-meal-plan-schema'

async function createDayMealPlan(dayMealPlan) {

    const dbDayMealPlan = new DayMealPlan(dayMealPlan);
    await dbDayMealPlan.save();
    return dbDayMealPlan
}

export {
    createDayMealPlan
}