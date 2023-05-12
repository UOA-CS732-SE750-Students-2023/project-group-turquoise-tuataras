import express from "express";
import { getNearbySupermarkets } from "../../google-maps/requests.js";
const router = express.Router();

/*
    Endpoint to get nearby supermarkets via Google Maps API
 */
router.get('/nearbyStores', async (req, res) => {
    const position = req.query;
    const stores = await getNearbySupermarkets(position.lat, position.lng);
    res.json(stores);
})

export default router;