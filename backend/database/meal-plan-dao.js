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
        const filter = { _id: dayMealPlan._id };
        const update = {};

        if (dayMealPlan.dateTime) {
            update.dateTime = dayMealPlan.dateTime;
        }

        if (dayMealPlan.user) {
            update.user = dayMealPlan.user;
        }

        if (dayMealPlan.recipe && dayMealPlan.recipe.length > 0){
            update.$push = { recipe: { $each: dayMealPlan.recipe } };
        }

        const result = await DayMealPlan.updateOne(filter, update);
        return !!result;
    } catch (error) {
        return false
    }
    
}

async function deleteDayMealPlanRecipe(id, recipeId) {
    const filter = { _id: id };
    const update = { $pull: { recipe: recipeId } };
    const result = await DayMealPlan.updateOne(filter, update);
    return result.modifiedCount > 0;
}

export {
    getMealPlanByUserAndCurrentWeek,
    createDayMealPlan,
    updateDayMealPlan,
    deleteDayMealPlanRecipe
}