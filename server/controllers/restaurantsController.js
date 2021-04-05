import pool from "../db/index.js";
import { joiValidators } from "../util/index.js";

const { restaurantValidation, restaurantIdValidation } = joiValidators;

/* eslint camelcase: 0 */

/**
 * GET /api/v1/restaurants/
 */
export const getAllRestaurants = async (_, res, next) => {
  try {
    const restaurants = await pool.query(
      `SELECT restaurants.id, restaurants.name, restaurants.location, restaurants.price_range, TRUNC(AVG(reviews.rating), 2) AS average 
       FROM restaurants 
       LEFT JOIN reviews 
       ON restaurants.id = reviews.fk_restaurants 
       GROUP BY restaurants.id 
       ORDER BY average 
       DESC NULLS LAST
       `
    );

    return res.json(
      restaurants.rows.map((restaurant) => ({
        id: restaurant.id,
        name: restaurant.name,
        location: restaurant.location,
        priceRange: restaurant.price_range,
        average: restaurant.average,
      }))
    );
  } catch (error) {
    if (!error.status) {
      error.status = 400;
      error.message = "Bad Request";
    }
    return next(error);
  }
};

// GET /api/v1/restaurants/:id
export const getRestaurantById = async (req, res, next) => {
  try {
    const { id } = req.params;

    await restaurantIdValidation.validateAsync({ id });
    const restaurant = await pool.query("SELECT * FROM restaurants WHERE id = $1", [id]);
    return res.json(restaurant.rows[0]);
  } catch (error) {
    if (!error.status) {
      error.status = 400;
      error.message = "Bad Request";
    }
    return next(error);
  }
};

// POST /api/v1/restaurants/
export const createRestaurant = async (req, res, next) => {
  try {
    const { name, location, price_range } = req.body;

    await restaurantValidation.validateAsync({ name, location, price_range });
    const restaurant = await pool.query(
      "INSERT INTO restaurants(name, location, price_range) values($1, $2, $3) returning *",
      [name, location, price_range]
    );

    const { id, price_range: priceRange } = restaurant.rows[0];
    return res.status(201).json({ id, name, location, priceRange });
  } catch (error) {
    if (!error.status) {
      error.status = 400;
      error.message = "Bad Request";
    }
    return next(error);
  }
};

// PUT /api/v1/restaurants/:id
export const updateRestaurantById = async (req, res, next) => {
  try {
    const { name, location, price_range } = req.body;
    const { id } = req.params;

    await restaurantValidation.validateAsync({ name, location, price_range });
    await restaurantIdValidation.validateAsync({ id });

    const restaurant = await pool.query(
      "UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 returning *",
      [name, location, price_range, id]
    );

    return res.status(201).json(restaurant.rows[0]);
  } catch (error) {
    if (!error.status) {
      error.status = 400;
      error.message = "Bad Request";
    }
    return next(error);
  }
};

// DELETE /api/v1/restaurants/:id
export const deleteRestaurantById = async (req, res, next) => {
  try {
    const { id } = req.params;

    await restaurantIdValidation.validateAsync({ id });
    await pool.query("DELETE FROM restaurants WHERE restaurants.id = $1", [id]);

    return res.status(204).send();
  } catch (error) {
    if (!error.status) {
      error.status = 400;
      error.message = "Bad Request";
    }
    return next(error);
  }
};
