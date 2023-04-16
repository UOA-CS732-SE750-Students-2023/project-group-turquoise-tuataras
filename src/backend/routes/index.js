import express from "express";
import { User } from "../database/user-schema";

const router = express.Router();

router.get('/users', async (req, res) => {
    const users = await User.find({});
    const filteredUsers = entries.map(({ id, username }) => ({ id, username }));
    res.json(filteredUsers);
});

router.get('/users/:username', async (req, res) => {
    const { username } = req.params;

    const user = await User.findOne({ username });

    if (user) return res.json(user);
    return res.sendStatus(404);
});

export default router;