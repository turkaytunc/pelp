import express from 'express';
import dotenv from 'dotenv';

const router = express.Router();
dotenv.config();

router.get('/', (_, res) => {
  res.json('works');
});

export default router;
