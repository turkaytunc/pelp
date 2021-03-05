import pool from '../db/index.js';

export const getAllRestaurants = async (_, res, next) => {
  try {
    const restaurants = await pool.query('SELECT * FROM restaurants');
    return res.json(restaurants.rows);
  } catch (error) {
    return next(error);
  }
};

export const getRestaurantById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (id <= 0 || id > 100) {
      const error = new Error('id must be between 0-100');
      error.statusCode = 400;
      return next(error);
    }

    const restaurant = await pool.query('SELECT * FROM restaurants WHERE id = $1', [id]);
    return res.json(restaurant.rows);
  } catch (error) {
    error.statusCode = 400;
    return next(error);
  }
};

export const createRestaurant = async (req, res, next) => {
  try {
    const { name, location, price_range } = req.body;

    const restaurant = await pool.query(
      'INSERT INTO restaurants(name, location, price_range) values($1, $2, $3) returning *',
      [name, location, price_range]
    );
    return res.status(201).json(restaurant.rows[0]);
  } catch (error) {
    error.statusCode = 400;
    return next(error);
  }
};

export const updateRestaurantById = async (req, res, next) => {
  try {
    const { name, location, price_range } = req.body;
    const { id } = req.params;
    const restaurant = await pool.query(
      'UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 returning *',
      [name, location, price_range, id]
    );

    return res.status(201).json(restaurant.rows[0]);
  } catch (error) {
    error.statusCode = 400;
    return next(error);
  }
};

export const deleteRestaurantById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const restaurant = await pool.query('DELETE FROM restaurants WHERE id = $1', [id]);

    return res.status(204).send();
  } catch (error) {
    error.statusCode = 400;
    return next(error);
  }
};
