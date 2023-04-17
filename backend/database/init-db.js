import * as dotenv from 'dotenv'
dotenv.config();
import mongoose from 'mongoose';
import { User } from './user-schema';
import { Recipe } from './recipe-schema';
import { ScheduledRecipe } from './scheduled-recipe-schema';
import recipe from '../database/init-recipe.json' assert { type: "json" };

async function run() {
    console.log(`Connecting to database at ${process.env.MONGODB_CONNECTION_STRING}...`);
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING, { useNewUrlParser: true }); // Connect using the connection string obtained from the environment

    console.log('Clearing db...');
    await User.deleteMany({});
    await ScheduledRecipe.deleteMany({});
    await Recipe.deleteMany({});

    console.log('Adding data...');
    const rootUser = new User({
        username: 'root',
        password: '123'
    });

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

    console.log(initRecipe);


    rootUser.savedRecipes.push(initRecipe);
    rootUser.save;

    await Recipe.create(initRecipe);
    await ScheduledRecipe.create(
        new ScheduledRecipe({
            dateTime: '2025-10-06',
            recipe: initRecipe,
            user: rootUser
        })
    );
    await User.create(rootUser);

    await mongoose.disconnect();
    console.log('Done!');
}

run();