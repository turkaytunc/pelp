import express from 'express';
import dotenv from 'dotenv';
import {
  getAllRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurantById,
  deleteRestaurantById,
} from '../../controllers/index.js';
import { authorization } from '../../middlewares/index.js';

const router = express.Router();
dotenv.config();

router.get('/', getAllRestaurants);
router.get('/:id', getRestaurantById);

router.post('/', authorization, createRestaurant);

router.put('/:id', authorization, updateRestaurantById);

router.delete('/:id', authorization, deleteRestaurantById);

export default router;
