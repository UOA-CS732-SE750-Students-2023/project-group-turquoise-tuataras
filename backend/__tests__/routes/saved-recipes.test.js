// import routes from '../../src/routes/api/saved-recipes.js'
// import { MongoMemoryServer } from 'mongodb-memory-server';
// import mongoose from 'mongoose';
// import express from 'express';
// import request from 'supertest';
// import recipe650181 from '../../src/database/init-recipe.json'
// import { Recipe } from '../../src/database/schema/recipe-schema.js';
// import jwt from 'jsonwebtoken'
// import { User } from '../../src/database/schema/user-schema.js';
// import MockAdapter from "axios-mock-adapter";
// import axios from "axios";
// import recipe631814 from '../testData/recipeData_631814.json';
//
// let mongod;
// let token;
// const app = express();
// app.use(express.json());
// app.use('/', routes);
//
// const axiosMock= new MockAdapter(axios);
// const createToken = (_id) => {
//     return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' });
// }
//
// beforeAll(async () => {
//     mongod = await MongoMemoryServer.create();
//     const connectionString = mongod.getUri();
//     await mongoose.connect(connectionString, { useNewUrlParser: true });
// });
//
// beforeEach(async () => {
//     await mongoose.connection.db.dropDatabase();
//     const recipes = await mongoose.connection.db.createCollection('recipes');
//     const user = new User({
//         username: "test",
//         password: "test"
//     });
//     await User.create(user);
//     token = createToken(user._id);
//     await recipes.insertMany([recipe650181,recipe631814]);
// });
// afterEach(() =>{
//     axiosMock.reset();
// });
// afterAll(async () => {
//     await mongoose.disconnect();
//     await mongod.stop();
// });
//
// describe('post saved recipe endpoint', () => {
//
//     it('post saved recipe', async(done) => {
//         request(app)
//             .post('/')
//             .set('Authorization', `Bearer ${token}`)
//             .send({
//                 "recipeId": "631814"
//             })
//             .expect(201)
//             .end(async (err, res) => {
//                 const user = await Recipe.findOne({username: "test"}).populate('savedRecipes');
//                 const savedRecipes = user.savedRecipes;
//                 expect(savedRecipes.length).toBe(1);
//                 expect(savedRecipes[0].spoonacularRecipeId).toBe(631814);
//
//             });
//     })
// })