import { connection } from '../database/db_connect.js'

const create = async ({
  id_usuario, nombre, apellido, email,
  contrasenia, rol_id, fecha_registro, fecha_nacimiento
}) => {

  try {

    const query = "INSERT INTO users (id_usuario, nombre, apellido, email, contrasenia, rol_id, fecha_registro, fecha_nacimiento) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [id_usuario, nombre, apellido, email, contrasenia, rol_id, fecha_registro, fecha_nacimiento];
    connection.query(query, values, function (err, result) {
      if (err) throw err;
      console.log("Usuario creado con exito", result.insertId);
    })
  } catch (error) {
    console.log("error al crear el usuario");
  }
}



// const findOneByEmail = async(email) => { 
//   const query = `
//         SELECT * FROM users 
//         WHERE EMAIL = ?
//     `
//   connection.query(sql)

// }

export const UserModel = {
  create,
  //findOneByEmail
}
