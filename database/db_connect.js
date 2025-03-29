import 'dotenv/config'
import * as mysql from 'mysql';

export const connection = mysql.createConnection({
  host: process.env.HOST_DB,
  user: process.env.USER_DB,
  password: process.env.PASSWORD_DATABASE,
  database: process.env.DB_NAME
});

connection.connect((err) => {
  try {
    console.log('connected to database');
  } catch (err) {
    console.log(err);
  }
});



