import express from 'express';
import {
    signupUser,
    loginUser } from '../database/user-dao';
import jwt from 'jsonwebtoken'

const router = express.Router();

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

export default router;