import savedRecipesRoutes from "./saved-recipes.js";
import express from "express";
import {setUserIntolerances} from "../../database/dao/user-dao.js";


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

export default router;