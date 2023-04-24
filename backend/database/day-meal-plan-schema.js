import mongoose from 'mongoose';
const Schema = mongoose.Schema;

//Imported to resolve MissingSchemaError when populating recipe fields
import { Recipe } from './recipe-schema.js'

const dayMealPlan = new Schema({
    dateTime: Date,
    recipe: {type: Schema.Types.ObjectId, ref: 'Recipe'},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
});

const DayMealPlan = mongoose.model('DayMealPlan', dayMealPlan);

export { DayMealPlan };