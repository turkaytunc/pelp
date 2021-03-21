import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';

import { restaurantRoutes, reviewRoutes } from './routers/v1/index.js';

dotenv.config();
const app = express();
const { PORT = 4000 } = process.env;

// middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

// routes
app.use('/api/v1/restaurants', restaurantRoutes);
app.use('/api/v1/reviews', reviewRoutes);

// Unhandled Endpoint Error
app.get('/*', (req, res, next) => {
  const error = new Error('Page Not Found');
  error.statusCode = 404;
  return next(error);
});

// Global Error Handler
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.statusCode || 500);
  return res.json({ message: error.message || 'An unexpected error occurred!' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
