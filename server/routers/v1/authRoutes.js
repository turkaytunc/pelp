import express from 'express';
import dotenv from 'dotenv';
import { createUser } from '../../controllers/index.js';

const router = express.Router();
dotenv.config();

router.post('/register', createUser);

export default router;
