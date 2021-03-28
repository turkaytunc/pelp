import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';

import { authRoutes, restaurantRoutes, reviewRoutes } from './routers/v1/index.js';
import StatusError from './util/StatusError.js';

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
app.use('/api/v1/auth', authRoutes);

// Unhandled Endpoint Error
app.get('/*', (req, res, next) => {
  const error = new StatusError('Page Not Found');
  error.status = 404;
  return next(error);
});

// Global Error Handler
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res.status(error.status || 500);
  return res.json({ message: error.message || 'An unexpected error occurred!' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
