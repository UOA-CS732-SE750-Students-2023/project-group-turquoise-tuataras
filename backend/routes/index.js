import api from './api/index.js';
import express from "express";

const router = express.Router();
router.use('/api', api);

import userRoutes from './user'
router.use('/user', userRoutes)

export default router;