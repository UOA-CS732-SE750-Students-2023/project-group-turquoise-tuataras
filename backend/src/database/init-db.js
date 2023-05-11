import * as dotenv from 'dotenv'
dotenv.config();
import mongoose from 'mongoose';
import { User } from './schema/user-schema.js';
import { Recipe } from './schema/recipe-schema.js';
import { DayMealPlan } from './schema/day-meal-plan-schema.js';
import recipe from '../database/init-recipe.json' assert { type: "json" };
import { signupUser } from './dao/user-dao.js';

async function run() {
    console.log(`Connecting to database at ${process.env.MONGODB_CONNECTION_STRING}...`);
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING, { useNewUrlParser: true }); // Connect using the connection string obtained from the environment

    console.log('Clearing db...');
    await User.deleteMany({});
    await DayMealPlan.deleteMany({});
    await Recipe.deleteMany({});

    console.log('Adding data...');
    const rootUser = await signupUser("root", "123");
    const initRecipe = new Recipe({
        spoonacularId: recipe.spoonacularId,
        types: recipe.types,
        ingredients: recipe.ingredients,
        title: recipe.title,
        image: recipe.image,
        readyInMinutes: recipe.readyInMinutes,
        servings: recipe.servings,
        nutrition: recipe.nutrition,
        summary: recipe.summary,
        cuisines: recipe.cuisines,
        instructions: recipe.instructions,
        rating: recipe.rating,
        comments: recipe.comments
    });

    await Recipe.create(initRecipe);
    await DayMealPlan.create(
        new DayMealPlan({
            dateTime: '2025-10-06',
            recipe: [initRecipe],
            user: rootUser
        })
    );

    rootUser.savedRecipes.push(initRecipe);
    const ratedRecipe = {spoonacularId:recipe.spoonacularId, rating:5};
    rootUser.ratedRecipes.push(ratedRecipe);
    rootUser.save;
    await User.create(rootUser);

    await mongoose.disconnect();
    console.log('Done!');
}

run();