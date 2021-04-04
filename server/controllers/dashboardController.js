import pool from '../db/index.js';
import { ErrorWithStatusCode } from '../util/index.js';

export const getProfile = async (req, res, next) => {
  try {
    const user = await pool.query('SELECT name, email FROM users WHERE user_unique = $1', [req.user]);
    return res.json({ ...user.rows[0] });
  } catch (error) {
    const err = new ErrorWithStatusCode('Something went wrong ooops', 400);
    return next(err);
  }
};
