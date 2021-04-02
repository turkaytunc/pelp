import express from 'express';
import dotenv from 'dotenv';
import { authController } from '../../controllers/index.js';

const { register, login } = authController;

const router = express.Router();
dotenv.config();

router.post('/register', register);
router.post('/login', login);

export default router;
