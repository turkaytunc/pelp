import express from 'express';
import dotenv from 'dotenv';
import { getAllRestaurants, getRestaurantById, createRestaurant, updateRestaurant } from '../../controllers/index.js';

const router = express.Router();
dotenv.config();

router.get('/', getAllRestaurants);
router.get('/:id', getRestaurantById);

router.post('/', createRestaurant);

router.put('/:id', updateRestaurant);

router.delete('/', (req, res) => {
  const { name, location, price_range } = req.body;

  res.status(204);
});

export default router;
