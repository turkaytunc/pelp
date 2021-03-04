import express from 'express';
import dotenv from 'dotenv';
import {
  getAllRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurantById,
  deleteRestaurantById,
} from '../../controllers/index.js';

const router = express.Router();
dotenv.config();

router.get('/', getAllRestaurants);
router.get('/:id', getRestaurantById);

router.post('/', createRestaurant);

router.put('/:id', updateRestaurantById);

router.delete('/:id', deleteRestaurantById);

export default router;
