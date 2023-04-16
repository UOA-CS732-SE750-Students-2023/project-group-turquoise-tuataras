import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const recipeSchema = new Schema({
    ingredients: [{ingredient: String}],
    steps: [{step: String}],
});

const Recipe = mongoose.model('RecipeEntry', recipeSchema);

export { Recipe };