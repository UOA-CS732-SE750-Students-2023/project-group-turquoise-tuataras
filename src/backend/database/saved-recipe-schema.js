import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const savedRecipeSchema = new Schema({
    user_id: [{ type: Schema.Types.ObjectId, ref: 'User'}],
    recipe_id: [{ type: Schema.Types.ObjectId, ref: 'Recipe'}]
});

const SavedRecipe = mongoose.model('SavedRecipeEntry', savedRecipeSchema);

export { SavedRecipe };