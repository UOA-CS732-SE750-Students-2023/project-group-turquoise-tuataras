import savedRecipesRoutes from "./saved-recipes.js";
import express from "express";
import {
    setUserIntolerances,
    signupUser,
    loginUser,
    resetUserCredentials } from "../../database/dao/user-dao.js";
import jwt from 'jsonwebtoken'

const router = express.Router({mergeParams: true});
router.use('/:userId/savedRecipes', savedRecipesRoutes)

router.put('/:userId/intolerances', async (req, res) => {
    const { userId } = req.params;
    const intolerances = req.body;
    setUserIntolerances(userId, intolerances).then(() => {
        res.status(201).json({
            "message": "Intolerances updated"
        });
    }).catch((err) => {
        res.status(404).json(err);
    });
});

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' });
}

//login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await loginUser(username, password);

        //create token
        const token = createToken(user._id);

        res.status(201).json({username, token});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
})

// signup route
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await signupUser(username, password);

        //create token
        const token = createToken(user._id);

        res.status(201).json({username, token});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
})

// reset route
router.patch('/:userId/reset', async (req, res) => {
    const { userId } = req.params
    const { username, password} = req.body

    try {
        const updatedUser = await resetUserCredentials(userId, username, password);

        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

export default router;