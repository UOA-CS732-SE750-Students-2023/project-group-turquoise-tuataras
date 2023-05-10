import routes from '../../src/routes/api/recipes.js'
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import express from 'express';
import request from 'supertest';
import recipe from '../../src/database/init-recipe.json'
import { Recipe } from '../../src/database/schema/recipe-schema.js';
import jwt from 'jsonwebtoken'
import { User } from '../../src/database/schema/user-schema.js';
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import recipeData from '../testData/recipeData_631814.json';
import spoonacularRecipeData from '../testData/spoonacularRecipeData_631814.json';

let mongod;
let token;
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
    const recipes = await mongoose.connection.db.createCollection('recipes');
    const user = new User({
        username: "test",
        password: "test"
    });
    await User.create(user);
    token = createToken(user._id);
    await recipes.insertOne(recipe);
});
afterEach(() =>{
    axiosMock.reset();
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
    it('get recipe when in database', (done) => {
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

    it('get recipe when not in database', async () => {

        axiosMock.onGet(`https://api.spoonacular.com/recipes/631814/information`,
            {params: {includeNutrition: true, apiKey: "12345"}})
            .reply(200, spoonacularRecipeData);

        request(app)
            .get('/631814')
            .send()
            .expect(200)
            .end((err, res) => {
                const apiRecipe = res.body;
                expect(apiRecipe).toEqual(recipeData);
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
            .set('Authorization', `Bearer ${token}`)
            .send({
                "username": "BenG",
                "comment": "Delicious",
                "date": "2023-06-06"
            })
            .expect(201)
            .end(async (err, res) => {
                if (err) {
                  return done(err)
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
                done();

            });
    })
})

describe('POST /:spoonacularId/rating', () => {
    
    /**
     * Tests that, when posting a rating, a 201 Created response is returned,
     * with the response body containing the new rating.
     */
    it('post rating', (done) => {
        request(app)
        .post('/650181/rating')
        .set('Authorization', `Bearer ${token}`)
        .send({"rating": 5})
        .expect(201)
        .end(async (err, res) => {
            if (err) {
                return done(err);
            }
            const dbRecipe = await Recipe.findOne({spoonacularId: 650181});
            const dbRating = dbRecipe.rating;
            const response = res.body;
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

describe('401 POST /:spoonacularId/comment', () => {
    
    /**
     * Tests that, when posting a comment without authorisation, a 401 Created response is returned.
     */
it('post comment', (done) => {    
    request(app)
        .post('/650181/comment')
        .send({
            "username": "BenG",
            "comment": "Delicious",
            "date": "2023-06-06"
        })
        .expect(401)
        .end(async (err, res) => {
            if (err) {
              return done(err)
            }
            done();
        });
    })  
})

describe('401 POST /:spoonacularId/rating', () => {
    
    /**
     * Tests that, when posting a rating without authorisation, a 401 Created response is returned.
     */
it('post comment', (done) => {    
    request(app)
        .post('/650181/rating')
        .send({"rating": "2"})
        .expect(401)
        .end(async (err, res) => {
            if (err) {
              return done(err)
            }
            done();
        });
    })  
})


describe('search endpoint', () => {
    const results = [
        {
            "id": 631814,
            "title": "$50,000 Burger",
            "image": "https://spoonacular.com/recipeImages/631814-312x231.jpg",
            "imageType": "jpg"
        },
        {
            "id": 642539,
            "title": "Falafel Burger",
            "image": "https://spoonacular.com/recipeImages/642539-312x231.png",
            "imageType": "png"
        },
        {
            "id": 663050,
            "title": "Tex-Mex Burger",
            "image": "https://spoonacular.com/recipeImages/663050-312x231.jpg",
            "imageType": "jpg"
        }
    ]
    const data = {results: results};
    /**
     * Tests that, when requesting recommendations, a 200 OK response is returned,
     * with the response body containing the recommended recipes.
     */
    it('simple search',  async () => {

        axiosMock.onGet(`https://api.spoonacular.com/recipes/complexSearch`)
            .reply(200, data);

        request(app)
            .get('/search')
            .query({recipeQuery: "burger"})
            .send()
            .expect(200)
            .end((err, res) => {
                const apiRecipes = res.body;
                expect(apiRecipes).toEqual(results);
                expect(axiosMock.history.get.length).toBe(1);
                expect(axiosMock.history.get.url).toEqual('https://api.spoonacular.com/recipes/complexSearch');
                expect(axiosMock.history.get.params.query).toBe("burger");
            });
    }, 10000); // timeout to 10 seconds

    it('complex search', async () => {

        const user = await User.findOne({username: "test"});
        user.intolerances = ["dairy", "egg"];
        await user.save();

        axiosMock.onGet(`https://api.spoonacular.com/recipes/complexSearch`)
            .reply(200, data);

        request(app)
            .get('/search')
            .query({
                recipeQuery: "burger",
                userName: "test",
                cuisines: ["american"],
                diets: ["vegetarian", "vegan"],
            })
            .send()
            .expect(200)
            .end((err, res) => {
                const apiRecipes = res.body;
                expect(apiRecipes).toEqual(results);
                const axiosReq = axiosMock.history.get;
                const axiosReqParams = axiosReq[0].params;
                expect(axiosReq.length).toBe(1);
                expect(axiosReq.url).toEqual('https://api.spoonacular.com/recipes/complexSearch');
                expect(axiosReqParams.query).toBe("burger");
                expect(axiosReqParams.cuisine).toBe("american");
                expect(axiosReqParams.diet).toBe("vegetarian|vegan");
                expect(axiosReqParams.intolerances).toBe("dairy,egg");
            });
    }, 10000); // timeout to 10 seconds
});


describe('recommendations endpoint', () => {
    const mealTypes = ["main course", "side dish", "dessert", "appetizer", "salad", "bread", "breakfast",
        "soup", "beverage", "fingerfood", "snack", "drink"]
    const results = [
        {
            "id": 631814,
            "title": "$50,000 Burger",
            "image": "https://spoonacular.com/recipeImages/631814-312x231.jpg",
            "imageType": "jpg"
        },
        {
            "id": 642539,
            "title": "Falafel Burger",
            "image": "https://spoonacular.com/recipeImages/642539-312x231.png",
            "imageType": "png"
        },
        {
            "id": 663050,
            "title": "Tex-Mex Burger",
            "image": "https://spoonacular.com/recipeImages/663050-312x231.jpg",
            "imageType": "jpg"
        }
    ]
    const data = {results: results};
        /**
        * Tests that, when requesting recommendations, a 200 OK response is returned,
        * with the response body containing the recommended recipes.
        */
        it('get recommendations',  (done) => {

            axiosMock.onGet(`https://api.spoonacular.com/recipes/complexSearch`)
                .reply(200, data);

            request(app)
                .get('/search/recommendations')
                .send()
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    const apiRecipes = res.body;
                    expect(Object.keys(apiRecipes).length).toBe(3);
                    Object.values(apiRecipes).forEach((recipes) => {
                        expect(recipes).toEqual(results);
                    });
                    expect(axiosMock.history.get.length).toBe(3);
                    Object.values(axiosMock.history.get).forEach((apiCall) => {
                        expect(apiCall.url).toEqual('https://api.spoonacular.com/recipes/complexSearch');
                        expect(apiCall.params.number).toBe(10);
                        expect(apiCall.params.sort).toBe('random');
                        expect(mealTypes).toContain(apiCall.params.type);
                    });
                    return done();
                });
        }, 10000); // timeout to 10 seconds

    it('get recommendations with user', async () => {

        const user = await User.findOne({username: "test"});
        const recipe = await Recipe.findOne({spoonacularId: 650181})
        user.intolerances = ["dairy", "egg"];
        user.savedRecipes.push(recipe);
        await user.save();

        axiosMock.onGet(`https://api.spoonacular.com/recipes/complexSearch`)
            .reply(200, data);
        request(app)
            .get('/search/recommendations')
            .query({userName: 'test'})
            .send()
            .expect(200)
            .end((err, res) => {
                const apiRecipes = res.body;
                expect(Object.keys(apiRecipes).length).toBe(3);
                Object.values(apiRecipes).forEach((recipes) => {
                    expect(recipes).toEqual(results);
                });
                expect(axiosMock.history.get.length).toBe(3);
                Object.values(axiosMock.history.get).forEach((apiCall) => {
                    expect(apiCall.url).toEqual('https://api.spoonacular.com/recipes/complexSearch');
                    expect(apiCall.params.number).toBe(10);
                    expect(apiCall.params.sort).toBe('random');
                    expect(mealTypes).toContain(apiCall.params.type);
                    expect(intolerances).toBe('dairy,egg');
                    expect(cuisine).toBe('American')
                });
            });
    }, 10000); // timeout to 10 seconds
});