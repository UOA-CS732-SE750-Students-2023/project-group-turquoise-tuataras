import routes from '../../src/routes/api/saved-recipes.js'
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import express from 'express';
import request from 'supertest';
import recipe650181 from '../../src/database/init-recipe.json'
import { Recipe } from '../../src/database/schema/recipe-schema.js';
import jwt from 'jsonwebtoken'
import { User } from '../../src/database/schema/user-schema.js';
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import recipe631814 from '../testData/recipeData_631814.json';
import recipe from "../../src/database/init-recipe.json";
import recipe2 from "../testData/recipeData_631814.json";
import {signupUser} from "../../src/database/dao/user-dao.js";

let mongod;
let token;
let user;

const app = express();
app.use(express.json());
app.use('/', routes);

const axiosMock= new MockAdapter(axios);
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' });
}

beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const connectionString = mongod.getUri();
    await mongoose.connect(connectionString, { useNewUrlParser: true });
});

beforeEach(async () => {
    await mongoose.connection.db.dropDatabase();
    user = await signupUser("test", "test");
    token = createToken(user._id);
    const recipes = await mongoose.connection.db.createCollection('recipes');
    await recipes.insertOne(recipe);
    await recipes.insertOne(recipe2);
    user.savedRecipes.addToSet(recipe);
    await user.save();
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
});

describe('post saved recipe endpoint', () => {

    it('post saved recipe', (done) => {
        request(app)
            .post('/')
            .set('Authorization', `Bearer ${token}`)
            .send({
                "recipeId": "631814"
            })
            .expect(201)
            .end(async (err, res) => {
                if(err){
                    return done(err);
                }
                const userDB = await User.findById(user._id).populate('savedRecipes');
                const savedRecipes = userDB.savedRecipes;
                expect(savedRecipes.length).toBe(2);
                expect(savedRecipes[1].spoonacularId).toBe(631814);
                done();
            });
    })

    it('post saved recipe without auth', (done) => {
        request(app)
            .post('/')
            .send({
                "recipeId": "631814"
            })
            .expect(401)
            .end(async (err, res) => {
                if (err) {
                    return done(err);
                }
                return done();
            });
    })
})

describe('delete saved recipe endpoint', () => {

    it('delete saved recipe', (done) => {
        request(app)
            .delete('/')
            .set('Authorization', `Bearer ${token}`)
            .send({
                "recipeId": "650181"
            })
            .expect(204)
            .end(async (err, res) => {
                if(err){
                    return done(err)
                }
                const userDB = await User.findById(user._id).populate('savedRecipes')
                const savedRecipes = userDB.savedRecipes;
                expect(savedRecipes.length).toBe(0);
                done();
            });
    })

    it('delete saved recipe without auth', (done) => {
        request(app)
            .delete('/')
            .send({
                "recipeId": "650181"
            })
            .expect(401)
            .end(async (err, res) => {
                if (err) {
                    return done(err);
                }
                return done();
            });
    })
})

describe('get saved recipes endpoint', () => {
    it('get saved recipes', (done) => {
        request(app)
            .get('/')
            .set('Authorization', `Bearer: ${token}`)
            .send()
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                expect(res.body.length).toBe(1);
                expect(res.body[0].spoonacularId).toBe(recipe.spoonacularId);
                return done();
            })
    })

    it('get saved recipes no auth', (done) => {
        request(app)
            .get('/')
            .send()
            .expect(401)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                return done();
            })
    })
});