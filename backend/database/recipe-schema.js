import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const recipeSchema = new Schema({
    name: String,
    ingredients: [String],
    steps: [String]
});

const Recipe = mongoose.model('Recipe', recipeSchema);

export { Recipe };