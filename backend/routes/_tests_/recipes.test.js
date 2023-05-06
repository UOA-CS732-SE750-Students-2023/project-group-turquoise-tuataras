import routes from '../api/recipes'
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import express from 'express';
import request from 'supertest';
import recipe from '../../database/init-recipe.json'
import { Recipe } from '../../database/schema/recipe-schema';
let mongod;
const app = express();
app.use(express.json());
app.use('/', routes);

beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const connectionString = mongod.getUri();
    await mongoose.connect(connectionString, { useNewUrlParser: true });
});

beforeEach(async () => {
    await mongoose.connection.db.dropDatabase();
    const collection = await mongoose.connection.db.createCollection('recipes');
    await collection.insertOne(recipe);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
});

describe('GET /:spoonacularId', () => {

    /**
     * Tests that, when requesting a specific recipe, a 200 OK response is returned,
     * with the response body containing the requested recipe.
     */
    it('get recipe', (done) => {
        request(app)
            .get('/650181')
            .send()
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                const apiRecipe = res.body;
                expect(apiRecipe.spoonacularId).toBe(650181);
                expect(apiRecipe.types).toEqual(recipe.types);
                const ingredients = apiRecipe.ingredients;
                var ingredientsNoId = [];
                for (var i = 0; i < ingredients.length; i++){
                    ingredientsNoId[i] = {name: ingredients[i].name, amount: ingredients[i].amount, unit: ingredients[i].unit}
                }
                expect(ingredientsNoId).toEqual(recipe.ingredients);
                expect(apiRecipe.title).toBe(recipe.title);
                expect(apiRecipe.image).toBe(recipe.image);
                expect(apiRecipe.readyInMinutes).toBe(recipe.readyInMinutes);
                expect(apiRecipe.servings).toBe(recipe.servings);
                const nutrition = apiRecipe.nutrition;
                var nutritionNoId = [];
                for (var i = 0; i < nutrition.length; i++){
                    nutritionNoId[i] = {
                        name: nutrition[i].name,
                        amount: nutrition[i].amount, 
                        percentOfDailyNeeds: nutrition[i].percentOfDailyNeeds, 
                        unit: nutrition[i].unit
                    }
                }    
                expect(nutritionNoId).toEqual(recipe.nutrition);
                expect(apiRecipe.summary).toBe(recipe.summary);
                expect(apiRecipe.cuisines).toEqual(recipe.cuisines);
                expect(apiRecipe.instructions).toEqual(recipe.instructions);
                expect(apiRecipe.rating).toEqual(recipe.rating);
                const comments = apiRecipe.comments;
                var commentsNoId = [];
                for (var i = 0; i < comments.length; i++){
                    commentsNoId[i] = {
                        username: comments[i].username,
                        comment: comments[i].comment,
                        date: String(comments[i].date).split('T')[0]
                    }
                } 
                expect(commentsNoId).toEqual(recipe.comments);
                return done();
            });
    }, 10000); // timeout to 10 seconds
});

describe('POST /:spoonacularId/comment', () => {

    /**
     * Tests that, when posting a comment, a 201 Created response is returned,
     * with the response body containing the comment.
     */
    it('post comment', (done) => {
        request(app)
        .post('/650181/comment')
        .send({
            "username": "BenG",
            "comment": "Delicious",
            "date": "2023-06-06"
         })
        .expect(201)
        .end(async (err, res) => {
            if (err) {
                return done(err);
            }
            const dbRecipe = await Recipe.findOne({spoonacularId: 650181});
            const dbComment = dbRecipe.comments[dbRecipe.comments.length-1];
            const dbCommentNoId = {
                "username": dbComment.username,
                "comment": dbComment.comment,
                "date": dbComment.date.toISOString().split('T')[0]
            }
            const comment = res.body;
            expect(dbCommentNoId).toEqual(comment);
            return done();
        });
    }, 10000);
})

describe('POST /:spoonacularId/rating', () => {

    /**
     * Tests that, when posting a rating, a 201 Created response is returned,
     * with the response body containing the new rating.
     */
    it('post rating', (done) => {
        request(app)
        .post('/650181/rating')
        .send({"rating": 5})
        .expect(201)
        .end(async (err, res) => {
            if (err) {
                return done(err);
            }
            const dbRecipe = await Recipe.findOne({spoonacularId: 650181});
            const dbRating = dbRecipe.rating;
            const response = res.body;
            console.log(response);
            expect(response).toEqual({message:"New rating: 4.583333333333333"});
            expect(dbRating).toEqual(
                {
                    rating: 4.583333333333333,
                    numberOfRatings: 6
                }
            );
            return done();
        });
    }, 10000);
})