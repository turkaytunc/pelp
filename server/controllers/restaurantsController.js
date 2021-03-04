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
