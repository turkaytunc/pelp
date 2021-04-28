import bcrypt from "bcrypt";
import pool from "../db/index.js";
import { generateToken, HttpError, joiValidators } from "../util/index.js";

const { registerValidation, loginValidation } = joiValidators;

/* eslint camelcase: 0 */

// POST /api/v1/auth/register
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    await registerValidation.validateAsync({ name, email, password });
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    const isUserExist = user.rows.length > 0;
    if (isUserExist) {
      throw new HttpError("Email is already in use!!", 401);
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
      "INSERT INTO users (name, password, email) VALUES ($1, $2, $3) RETURNING name, email, user_unique",
      [name, passwordHash, email]
    );

    const token = generateToken(newUser.rows[0].user_unique);
    return res.status(200).json({ user: { name: newUser.rows[0].name, email: newUser.rows[0].email }, token });
  } catch (error) {
    if (!error.status) {
      error.status = 400;
    }
    return next(error);
  }
};

// POST /api/v1/auth/login
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    await loginValidation.validateAsync({ email, password });
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    const isUserExist = user.rows.length > 0;
    if (!isUserExist) {
      throw new HttpError("Wrong email or password!", 401);
    }

    const isPasswordValid = await bcrypt.compare(password, user.rows[0].password);
    if (isPasswordValid) {
      const { user_unique, name, email } = user.rows[0];
      const token = generateToken(user_unique);
      return res.json({ user: { name, email }, token });
    }

    throw new HttpError("Wrong email or password!", 403);
  } catch (error) {
    if (!error.status) {
      error.status = 400;
    }
    return next(error);
  }
};
