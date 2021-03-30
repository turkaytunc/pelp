import pool from '../db/index.js';
import { StatusError } from '../util/index.js';

export const getReviewsByRestaurantId = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!Number.isInteger(parseInt(id))) {
      const error = new StatusError('id must be number', 400);
      return next(error);
    }

    const restaurant = await pool.query(
      `SELECT reviews.id, body AS comment,reviews.name AS user, reviews.rating AS rating
       FROM restaurants, reviews
       WHERE reviews.fk_restaurants = restaurants.id and restaurants.id = $1`,
      [id]
    );
    const averageRating = await pool.query(
      `SELECT trunc(AVG(rating), 2) AS average
       FROM reviews
       WHERE reviews.fk_restaurants = $1`,
      [id]
    );
    const result = { average: averageRating.rows[0].average, reviews: [...restaurant.rows] };

    return res.json(result);
  } catch (error) {
    error.status = 400;
    return next(error);
  }
};

export const addReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, rating, comment } = req.body;

    const restaurant = await pool.query(
      `INSERT INTO reviews (name, rating, body, fk_restaurants) 
       VALUES ($1, $2, $3, $4) returning reviews.id , name, rating, body
      `,
      [name, rating, comment, id]
    );

    return res.status(201).json(restaurant.rows[0]);
  } catch (error) {
    error.status = 400;
    return next(error);
  }
};
