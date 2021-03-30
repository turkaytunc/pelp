import express from 'express';
import dotenv from 'dotenv';
import { authController } from '../../controllers/index.js';

const { userRegister, userLogin } = authController;

const router = express.Router();
dotenv.config();

router.post('/register', userRegister);
router.post('/login', userLogin);

export default router;
