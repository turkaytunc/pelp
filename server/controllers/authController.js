import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import pool from '../db/index.js';
import StatusError from '../util/StatusError.js';

dotenv.config();
const secret = process.env.JWT_SECRET;
const TEN_MIN = 1000 * 60 * 10;

// POST /api/v1/auth/register
export const userRegister = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    const isUserExist = user.rows.length > 0;
    if (isUserExist) {
      const error = new StatusError('Email is already in use!!', 401);
      return next(error);
    }

    const passHash = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
      'INSERT INTO users (name, password, email) VALUES ($1, $2, $3) RETURNING name, email',
      [name, passHash, email]
    );

    const token = jwt.sign({ user: newUser.rows[0].user_unique }, secret, { expiresIn: `${TEN_MIN}ms` });

    return res.status(200).json({ user: newUser.rows[0], token });
  } catch (error) {
    error.status = 400;
    return next(error);
  }
};

// POST /api/v1/auth/login

export const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    const isUserExist = user.rows.length > 0;
    if (!isUserExist) {
      return res.status(401).send();
    }

    const isPasswordValid = await bcrypt.compare(password, user.rows[0].password);
    if (isPasswordValid) {
      const { user_unique, name, email } = user.rows[0];

      const token = jwt.sign({ user: user_unique }, secret, { expiresIn: `${TEN_MIN}ms` });

      return res.json({ user: { name, email }, token });
    }

    return res.status(403).send();
  } catch (error) {
    return next(error);
  }
};
