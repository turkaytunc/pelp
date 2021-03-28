import bcrypt from 'bcrypt';
import pool from '../db/index.js';

// POST /api/v1/register/
export const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    const isUserExist = user.rows.length > 0;
    if (isUserExist) {
      const error = new Error('Email is already in use!!');
      error.statusCode = 401;
      return next(error);
    }
    const passHash = await bcrypt.hash(password, 10);

    const createdUser = await pool.query(
      'INSERT INTO users (name, password, email) VALUES ($1, $2, $3) RETURNING name, password, user_unique',
      [name, passHash, email]
    );

    return res.status(200).json({ user: createdUser.rows[0] });
  } catch (error) {
    error.statusCode = 400;
    return next(error);
  }
};
