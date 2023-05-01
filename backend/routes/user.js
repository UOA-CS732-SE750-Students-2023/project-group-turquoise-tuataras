import express from 'express';
import {
    signupUser,
    loginUser } from '../database/user-dao';

const router = express.Router();

//login route
router.post('/login', async (req, res) => {
    res.json(loginUser)
})

// signup route
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await signupUser(username, password);

        res.status(201).json({username, user})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

export default router;