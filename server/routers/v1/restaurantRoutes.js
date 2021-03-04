import express from 'express';
import dotenv from 'dotenv';
import { getAllRestaurants, getRestaurantById } from '../../controllers/index.js';

const router = express.Router();
dotenv.config();

router.get('/', getAllRestaurants);
router.get('/:id', getRestaurantById);

router.post('/', (req, res) => {
  const { name, location, price_range } = req.body;

  res.status(201).json({ restaurant: { name, location, price_range } });
});

router.put('/', (req, res) => {
  const { name, location, price_range } = req.body;

  res.status(201).json({ restaurant: { name, location, price_range } });
});

router.delete('/', (req, res) => {
  const { name, location, price_range } = req.body;

  res.status(204);
});

export default router;
