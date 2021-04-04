import dotenv from 'dotenv';
import app from './app.js';

dotenv.config();
const { PORT = 4000 } = process.env;

// eslint-disable-next-line no-console
app.listen(PORT, console.log(`Server running on http://localhost:${PORT}`));
