import dotenv from 'dotenv';
import app from './app.js';

dotenv.config();
const { PORT = 4000 } = process.env;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
