import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const scheduledRecipeSchema = new Schema({
    dateTime: Date,
    recipe: {type: Schema.Types.ObjectId, ref: 'Recipe'},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
});

const ScheduledRecipe = mongoose.model('ScheduledRecipe', scheduledRecipeSchema);

export { ScheduledRecipe };