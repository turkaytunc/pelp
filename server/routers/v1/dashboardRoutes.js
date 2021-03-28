import express from 'express';
import dotenv from 'dotenv';
import { getProfile } from '../../controllers/index.js';
import { authorization } from '../../middlewares/index.js';

const router = express.Router();
dotenv.config();

router.get('/', authorization, getProfile);

export default router;
