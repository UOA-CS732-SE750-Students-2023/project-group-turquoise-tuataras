import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const recipeSchema = new Schema({
    spoonacularId: Number,
    types: {
        vegetarian: Boolean,
        vegan: Boolean,
        glutenFree: Boolean,
        dairyFree: Boolean
    },
    ingredients: [{
        name: String,
        amount: Number,
        unit: String
    }],
    title: String,
    image: String,
    readyInMinutes: Number,
    servings: Number,
    nutrition: [{
        name: String,
        amount: Number,
        unit: String,
        percentOfDailyNeeds: Number
    }],
    summary: String,
    cuisines: [String],
    instructions: [String],
    rating: {
        rating: Number,
        numberOfRatings: Number
    },
    comments: [{
        username: String,
        comment: String,
        date: String
    }]
});

const Recipe = mongoose.model('Recipe', recipeSchema);

export { Recipe };