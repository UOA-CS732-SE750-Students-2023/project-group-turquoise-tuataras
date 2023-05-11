import express from "express";
import {searchRecipes, getRecipeBySpoonacularId} from "../../spoonacular/queries.js";
import {createRecipe, getRecipeById} from "../../database/dao/recipe-dao.js";
import {getIntolerances, rateRecipe, userData} from "../../database/dao/user-dao.js";
import requireAuth from '../../middleware/requireAuth.js'

const authRouter = express.Router();

// Apply requireAuth middleware to all routes on the auth router
authRouter.use(requireAuth);

authRouter.post('/:spoonacularId/comment', async (req, res) => {
    let userId;
    try{userId = req.user._id}
    catch{
        console.log("User is null");
        res.status(404).send("User must be logged in to comment or user is not found");
        return;
    }
    const { spoonacularId } = req.params;
    const comment = req.body;
    const recipe = await getRecipe(spoonacularId, true);
    if (recipe){
        recipe.comments.push({
            username: comment.username,
            comment: comment.comment,
            date: comment.date
        });
        recipe.save();
        res.status(201).json(comment);
    }
    else{
        res.status(404).json({"message": `Recipe with spoonacular ID: ${spoonacularId} not found`});
    }
});

authRouter.post('/:spoonacularId/rating', async (req, res) => {
    let userId;
    try{userId = req.user._id}
    catch{
        console.log("User is null");
        res.status(404).send("User must be logged in to rate or user is not found");
        return;
    }

    const { spoonacularId } = req.params;
    const rating = req.body.rating;
    const canRate = await rateRecipe(userId, spoonacularId, rating);
    if (!canRate){
        res.status(409).send("Already rated");
        return;
    }
    const recipe = await getRecipe(spoonacularId, true);
    if (recipe){
        const newCalculatedRating = (recipe.rating.rating*recipe.rating.numberOfRatings + rating)/(recipe.rating.numberOfRatings + 1);
        const newRating = {
            rating: newCalculatedRating,
            numberOfRatings: recipe.rating.numberOfRatings+1
        };
        recipe.rating = newRating;
        await recipe.save();
        res.status(201).json({
            "message": "New rating: " + newCalculatedRating
        });
    }
    else{
        res.status(404).json({"message": `Recipe with spoonacular ID: ${spoonacularId} not found`});
    }
});

const router = express.Router();

router.get("/search", async (req, res) => {
    const { recipeQuery, cuisines, diet, userName, type, maxReadyTime, number, offset } = req.query;
    const searchQuery = {};
    recipeQuery && (searchQuery.query = recipeQuery);
    cuisines && (searchQuery.cuisines = cuisines.toString());
    diet && (searchQuery.diet = diet.join('|'));
    userName && (searchQuery.intolerances = getIntolerances(userName).toString());
    type && (searchQuery.type = type);
    maxReadyTime && (searchQuery.maxReadyTime = maxReadyTime);
    number && (searchQuery.number = number);
    offset && (searchQuery.offset = offset);
    const res1 = await searchRecipes(searchQuery)
    res.json(res1);
});

router.get("/recommendations", async (req, res) => {
    const { userName } = req.query;

    const commonQuery = {};
    commonQuery.number = 10;
    commonQuery.sort = 'random';

    if(userName) {
        const {savedRecipes, intolerances} = await userData(userName);
        let cuisines = [];
        savedRecipes.forEach(recipe => {
            cuisines = [...new Set([cuisines, ...recipe.cuisines])];
        });

        commonQuery.cuisines = cuisines.toString();
        commonQuery.intolerances = intolerances.toString();
    }
    const recommendations = {};
    const mealTypes = ["main course", "side dish", "dessert", "appetizer", "salad", "bread", "breakfast",
        "soup", "beverage", "fingerfood", "snack", "drink"]
        .sort(() => 0.5 - Math.random()).slice(0, 3);
    for (const mealType of mealTypes) {
        recommendations[mealType] = await searchRecipes({...commonQuery, type: mealType});
    }

    res.json(recommendations);
});

router.get("/:spoonacularId", async (req, res) => {
    const spoonacularId = req.params.spoonacularId;
    let recipe = await getRecipe(spoonacularId, false);

    if (recipe) {
        res.json(recipe).status(200);
    } else {
        res.status(404).json({"message": `Recipe with spoonacular ID: ${spoonacularId} not found`});
    }
});

// Mount the auth router onto the main router for the routes that require authentication
router.use(authRouter);

async function getRecipe(spoonacularId, createIfNotExists = false) {
    let recipe = await getRecipeById(spoonacularId);
    if (recipe) {
        return recipe;
    }

    if(createIfNotExists) {
        return createRecipe(spoonacularId);
    }
    return getRecipeBySpoonacularId(spoonacularId);
}

export default router;