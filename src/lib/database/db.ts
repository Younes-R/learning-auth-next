import { Pool } from "pg";

const pool = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  port: Number(process.env.PG_PORT),
  ssl: { rejectUnauthorized: false },
});

pool.on("connect", (client) => {
  console.log("A new client is connected to database.");
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle client.");
});

export default async function query(text: string, params: any[]) {
  const start = Date.now();
  const result = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log("Executed query:", { text, duration, rows: result.rowCount });
  return result.rows;
}
