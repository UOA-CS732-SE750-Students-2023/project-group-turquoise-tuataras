import api from './api';
import express from "express";

const router = express.Router();
router.use('/api', api);

export default router;