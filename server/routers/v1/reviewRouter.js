import express from "express";
import { reviewsController } from "../../controllers/index.js";

const { addReview, getReviewsByRestaurantId } = reviewsController;

const reviewRouter = express.Router();

// GET /api/v1/reviews/
reviewRouter.get("/:id", getReviewsByRestaurantId);

// POST /api/v1/reviews/id
reviewRouter.post("/:id", addReview);

export default reviewRouter;
