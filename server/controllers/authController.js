import bcrypt from 'bcrypt';
import pool from '../db/index.js';
import { generateToken } from '../util/index.js';
import { StatusError } from '../util/index.js';

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
      'INSERT INTO users (name, password, email) VALUES ($1, $2, $3) RETURNING name, email, user_unique',
      [name, passHash, email]
    );

    const { user_unique: unique, name: username, email: userMail } = newUser.rows[0];
    const token = generateToken(unique);
    return res.status(200).json({ user: { name: username, email: userMail }, token });
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

      const token = generateToken(user_unique);

      return res.json({ user: { name, email }, token });
    }

    return res.status(403).send();
  } catch (error) {
    return next(error);
  }
};
