import express from "express";
import { getNearbySupermarkets } from "../../google-maps/requests.js";
const router = express.Router();

router.get('/nearbyStores', async (req, res) => {
    const position = req.query;
    console.log(position);
    const stores = await getNearbySupermarkets(position.lat, position.lng);
    res.json(stores);
})

export default router;