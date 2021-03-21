import pool from '../db/index.js';

export const getReviewsByRestaurantId = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (id <= 0 || id > 100) {
      const error = new Error('id must be between 0-100');
      error.statusCode = 400;
      return next(error);
    }

    const restaurant = await pool.query(
      `SELECT body AS comment,reviews.name AS user, reviews.rating AS rating
       FROM restaurants, reviews
       WHERE reviews.fk_restaurants = restaurants.id and restaurants.id = $1`,
      [id]
    );
    return res.json(restaurant.rows);
  } catch (error) {
    error.statusCode = 400;
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

    res.status(201).json(restaurant.rows[0]);
  } catch (error) {
    error.statusCode = 400;
    return next(error);
  }
};
