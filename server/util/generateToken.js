import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secret = process.env.JWT_SECRET;
const TEN_MIN = 1000 * 60 * 10;

export const generateToken = (userId) => {
  const token = jwt.sign({ user: userId }, secret, { expiresIn: `${TEN_MIN}ms` });

  return token;
};
