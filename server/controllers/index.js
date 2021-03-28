export {
  getAllRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurantById,
  deleteRestaurantById,
} from './restaurantsController.js';

export { getReviewsByRestaurantId, addReview } from './reviewsController.js';

export { userRegister, userLogin } from './authController.js';
