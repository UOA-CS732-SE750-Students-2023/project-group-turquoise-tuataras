import * as dotenv from 'dotenv'
dotenv.config();
import mongoose from 'mongoose';
import { User } from './user-schema';
import { Recipe } from './recipe-schema';
import { Schedule } from './schedule-schema';

// This is a standalone program which will populate the database with initial data.
async function run() {
    console.log(`Connecting to database at ${process.env.MONGODB_CONNECTION_STRING}...`);
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING, { useNewUrlParser: true }); // Connect using the connection string obtained from the environment

    console.log('Clearing db...');
    await User.deleteMany({});
    await Schedule.deleteMany({});
    await Recipe.deleteMany({});

    console.log('Adding data...');
    const rootUser = new User({
        username: 'root',
        password: '123'
    });

    const baconAndEggs = new Recipe({
        name: "Bacon and Eggs",
        ingredients: ["bacon", "eggs"],
        steps: ["fry bacon", "fry eggs"]
    });

    const schedule = new Schedule({
        Monday: baconAndEggs,
        Tuesday: baconAndEggs,
        Wednesday: baconAndEggs,
        Thursday: baconAndEggs,
        Friday: baconAndEggs,
        Saturday: baconAndEggs,
        Sunday: baconAndEggs
    });

    rootUser.savedRecipes.push(baconAndEggs);
    rootUser.mealSchedule.push(schedule);
    rootUser.save;

    await Recipe.create(baconAndEggs);
    await Schedule.create(schedule);
    await User.create(rootUser);

    await mongoose.disconnect();
    console.log('Done!');
}

run();