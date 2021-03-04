import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { PG_HOST, PG_PASSWORD, PG_USER, PG_DATABASE, PG_PORT } = process.env;

const pool = new Pool({
  user: PG_USER,
  password: PG_PASSWORD,
  port: PG_PORT,
  database: PG_DATABASE,
  host: PG_HOST,
});

export default pool;
