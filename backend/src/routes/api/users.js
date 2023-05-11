import savedRecipesRoutes from "./saved-recipes.js";
import express from "express";
import {
    setUserIntolerances,
    signupUser,
    loginUser,
    resetUserCredentials } from "../../database/dao/user-dao.js";
import jwt from 'jsonwebtoken'
import requireAuth from '../../middleware/requireAuth.js'

const authRouter = express.Router();

// Apply requireAuth middleware to all routes on the auth router
authRouter.use(requireAuth);

authRouter.put('/intolerances', async (req, res) => {
    let userId;
    try{userId = req.user._id}
    catch{
        console.log("User is null");
        res.status(404).send("User not found");
        return;
    }
    const intolerances = req.body;
    setUserIntolerances(userId, intolerances).then(() => {
        res.status(201).json({
            "message": "Intolerances updated"
        });
    }).catch((err) => {
        res.status(404).json(err);
    });
});

// reset route
authRouter.patch('/reset', async (req, res) => {
    let userId;
    try{userId = req.user._id}
    catch{
        console.log("User is null");
        res.status(404).send("User not found");
        return;
    }
    
    const { username, password} = req.body

    try {
        const updatedUser = await resetUserCredentials(userId, username, password);

        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

const router = express.Router({mergeParams: true});
router.use('/savedRecipes', savedRecipesRoutes)

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

// Mount the auth router onto the main router for the routes that require authentication
router.use(authRouter);

export default router;