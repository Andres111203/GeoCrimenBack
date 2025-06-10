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
  console.log("✅ Conexión a PostgreSQL exitosa");
  client.release();
} catch (err) {
  console.error("❌ Error al conectar a PostgreSQL:", err);
}
// import * as mysql from 'mysql';
// import mysql2 from 'mysql2';
// import mysql from 'mysql2/promise'


// //CREAMOS CONEXION
// export const db = await mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME
// });


//VERIFICAMOS CONEXION
// db.connect((err) => {
//   try {
//     console.log('connected to database');
//   } catch (err) {
//     console.error('Error al conectar la bd');
//   }
// });

export default db;



