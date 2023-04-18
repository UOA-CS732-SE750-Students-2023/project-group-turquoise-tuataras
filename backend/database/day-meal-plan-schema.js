import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const dayMealPlan = new Schema({
    dateTime: Date,
    recipe: {type: Schema.Types.ObjectId, ref: 'Recipe'},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
});

const DayMealPlan = mongoose.model('DayMealPlan', dayMealPlan);

export { DayMealPlan };