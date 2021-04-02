import bcrypt from 'bcrypt';
import pool from '../db/index.js';
import { generateToken, StatusError, joiValidators } from '../util/index.js';

const { registerValidation } = joiValidators;

// POST /api/v1/auth/register
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    await registerValidation.validateAsync({ name, email, password });
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    const isUserExist = user.rows.length > 0;
    if (isUserExist) {
      throw new StatusError('Email is already in use!!', 401);
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
      'INSERT INTO users (name, password, email) VALUES ($1, $2, $3) RETURNING name, email, user_unique',
      [name, passwordHash, email]
    );

    const token = generateToken(newUser.rows[0].user_unique);
    return res.status(200).json({ user: { name: newUser.rows[0].name, email: newUser.rows[0].email }, token });
  } catch (error) {
    error.status = 400;
    return next(error);
  }
};

// POST /api/v1/auth/login

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    const isUserExist = user.rows.length > 0;
    if (!isUserExist) {
      return res.status(401).json({ message: 'Wrong email or password!' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.rows[0].password);
    if (isPasswordValid) {
      const { user_unique, name, email } = user.rows[0];

      const token = generateToken(user_unique);

      return res.json({ user: { name, email }, token });
    }
    return res.status(403).json({ message: 'Wrong email or password!' });
  } catch (error) {
    return next(error);
  }
};
