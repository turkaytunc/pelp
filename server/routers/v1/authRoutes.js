import express from 'express';
import dotenv from 'dotenv';
import { userRegister, userLogin } from '../../controllers/index.js';

const router = express.Router();
dotenv.config();

router.post('/register', userRegister);
router.post('/login', userLogin);

export default router;
