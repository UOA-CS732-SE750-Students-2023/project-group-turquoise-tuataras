import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const recipeSchema = new Schema({
    spoonacularId: Number,
    types: Object,
    ingredients: [Object],
    title: String,
    image: String,
    readyInMinutes: Number,
    servings: Number,
    nutrition: Object,
    summary: String,
    cuisines: [String],
    instructions: [String],
    rating: Object,
    comments: [Object]
});

const Recipe = mongoose.model('Recipe', recipeSchema);

export { Recipe };