import express from "express";
import { restaurantController } from "../../controllers/index.js";
import { authorization } from "../../middlewares/index.js";

const {
  getAllRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurantById,
  deleteRestaurantById,
} = restaurantController;

const restaurantRouter= express.Router();

restaurantRouter.get("/", getAllRestaurants);
restaurantRouter.get("/:id", getRestaurantById);
restaurantRouter.post("/", authorization, createRestaurant);
restaurantRouter.put("/:id", authorization, updateRestaurantById);
restaurantRouter.delete("/:id", authorization, deleteRestaurantById);

export default restaurantRouter;
