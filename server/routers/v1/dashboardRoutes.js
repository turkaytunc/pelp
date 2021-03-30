import express from 'express';
import dotenv from 'dotenv';
import { dashboardController } from '../../controllers/index.js';
import { authorization } from '../../middlewares/index.js';

const { getProfile } = dashboardController;

const router = express.Router();
dotenv.config();

router.get('/', authorization, getProfile);

export default router;
