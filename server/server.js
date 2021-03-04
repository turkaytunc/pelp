import express from 'express';
import dotenv from 'dotenv';

import restaurantRoutes from './routers/v1/restaurantRoutes.js';

dotenv.config();
const app = express();
const { PORT = 4000 } = process.env;

app.use('/api/v1/restaurants', restaurantRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
