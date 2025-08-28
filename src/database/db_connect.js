import dotenv from "dotenv";
dotenv.config();

import { Pool } from "pg";

const db = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
});

try {
  const client = await db.connect();
  console.log("Conexión a base de datos exitosa");
  client.release();
} catch (err) {
  console.error("Error al conectar a base de datos: ", err);
}

export default db;



