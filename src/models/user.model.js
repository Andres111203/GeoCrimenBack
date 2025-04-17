import { db } from '../database/db_connect.js'

const create = async ({
  id_usuario, nombre, apellido, email,
  contrasenia, rol_id, fecha_registro, fecha_nacimiento
}) => {

  try {

    const query = "INSERT INTO users (id_usuario, nombre, apellido, email, contrasenia, rol_id, fecha_registro, fecha_nacimiento) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [id_usuario, nombre, apellido, email, contrasenia, rol_id, fecha_registro, fecha_nacimiento];
    await connection.query(query, values, function (err, result) {
      if (err) throw err;
      console.log("Usuario creado con exito", result.insertId);
    })
  } catch (error) {
    console.log("error al crear el usuario");
  }
}



const findOneByEmail = async(email) => { 
  return new Promise((resolve, reject) => {
      const query = "SELECT * FROM users WHERE EMAIL = ?"
      const values = [email]
      connection.query(query, values, (err, result) => {
        if(err) return reject(err);
        resolve(result[0]);
      })
    })
}

export const UserModel = {
    create,
    findOneByEmail
}