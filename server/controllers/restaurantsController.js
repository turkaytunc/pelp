import pool from '../db/index.js';

export const getAllRestaurants = async (_, res) => {
  try {
    const restaurants = await pool.query('SELECT * FROM restaurants');

    res.json(restaurants.rows);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

export const getRestaurantById = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await pool.query('SELECT * FROM restaurants WHERE id = $1', [id]);

    res.json(restaurant.rows);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
