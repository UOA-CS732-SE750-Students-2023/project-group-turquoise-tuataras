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
    res.json(signupUser)
})

export default router;