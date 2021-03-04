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

export const createRestaurant = async (req, res) => {
  try {
    const { name, location, price_range } = req.body;
    const restaurant = await pool.query(
      'INSERT INTO restaurants(name, location, price_range) values($1, $2, $3) returning *',
      [name, location, price_range]
    );

    res.status(201).json(restaurant.rows[0]);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

export const updateRestaurant = async (req, res) => {
  try {
    const { name, location, price_range } = req.body;
    const { id } = req.params;
    const restaurant = await pool.query(
      'UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 returning *',
      [name, location, price_range, req.params.id]
    );

    res.status(201).json(restaurant.rows[0]);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
