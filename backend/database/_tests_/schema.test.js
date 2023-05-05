import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import recipe from '../init-recipe.json'
import { Recipe } from '../schema/recipe-schema';
import { User } from '../schema/user-schema';
import { DayMealPlan } from '../schema/day-meal-plan-schema';

let mongod;

beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const connectionString = mongod.getUri();
    await mongoose.connect(connectionString, { useNewUrlParser: true });
});

beforeEach(async () => {
    await mongoose.connection.db.dropDatabase();
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
    const rootUser = new User({
        username: 'root',
        password: '123'
    });
    const benUser = new User({
        username: 'ben',
        password: 'abc'
    });
    await User.create(rootUser);
    await User.create(benUser);
    await DayMealPlan.create(
        new DayMealPlan({
            dateTime: '2025-10-06',
            recipe: [initRecipe],
            user: rootUser
        })
    );
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
});

it('get all recipes', async () => {
    const recipesFromDB = await Recipe.find();
    expect(recipesFromDB).toBeTruthy();
    expect(recipesFromDB[0].spoonacularId).toBe(650181);
});

it('get all users', async () => {
    const usersFromDB = await User.find();
    expect(usersFromDB).toBeTruthy();
    expect(usersFromDB.length).toBe(2);
    expect(usersFromDB[0].username).toBe('root');
    expect(usersFromDB[1].username).toBe('ben');
});

it('get a specific recipe', async () => {
    const recipeFromDB = await Recipe.findOne({spoonacularId: 650181});
    expect(recipeFromDB.spoonacularId).toBe(650181);
});

it('get a specific user', async () => {
    const user = await User.findOne({username: "root"});
    expect(user.username).toBe('root');
});

it('get a day meal plan', async () => {
    const mealPlan = await DayMealPlan.findOne({dateTime:'2025-10-06'}).populate('user').populate('recipe');
    console.log(mealPlan);
    expect(mealPlan.user.username).toBe('root');
    expect(mealPlan.recipe[0].spoonacularId).toBe(650181);
});