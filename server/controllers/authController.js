import pool from '../db/index.js';

// POST /api/v1/register/
export const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    const isUserExist = user.rows.length > 0;
    if (isUserExist) {
      return res.status(401).send();
    }

    const createdUser = await pool.query(
      'INSERT INTO users (name, password, email) VALUES ($1, $2, $3) RETURNING name, password',
      [name, password, email]
    );

    return res.status(200).json({ user: createdUser.rows[0] });
  } catch (error) {
    error.statusCode = 400;
    return next(error);
  }
};
