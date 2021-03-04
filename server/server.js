import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

const { PORT = 4000 } = process.env;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
