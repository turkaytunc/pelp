import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secret = process.env.JWT_SECRET;

export const authorization = (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
      return res.status(403).send();
    }
    const token = authHeader.split(' ')[1];
    const verifyJwt = jwt.verify(token, secret);

    req.user = verifyJwt.user;
    return next();
  } catch (error) {
    error.status = 403;
    return next(error);
  }
};
