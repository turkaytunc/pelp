import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import pool from '../db/index.js';

dotenv.config();
const secret = process.env.JWT_SECRET;

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
    const newUser = await pool.query(
      'INSERT INTO users (name, password, email) VALUES ($1, $2, $3) RETURNING name, user_unique',
      [name, passHash, email]
    );

    const token = jwt.sign({ data: newUser.rows[0].user_unique }, secret, { expiresIn: 1000 * 60 * 10 });

    return res.status(200).json({ user: newUser.rows[0], token });
  } catch (error) {
    error.statusCode = 400;
    return next(error);
  }
};
