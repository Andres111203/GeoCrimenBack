import { connection } from '../database/db_connect.js'

const create = async ({
  id_usuario, nombre, apellido, email,
  contrasenia, rol_id, fecha_registro, fecha_nacimiento
}) => {

  const query = {
    text: `INSERT INTO usuarios(id_usuario, nombre, apellido, email, contrasenia, rol_id, fecha_registro, fecha_nacimiento)
    values($1, $2, $3, $4, $5, $6, $7, $8)
    returning nombre, apellido, email, rol_id, fecha_registro, fecha_nacimiento `,
    values: [id_usuario, nombre, apellido, email, contrasenia, rol_id, fecha_registro, fecha_nacimiento]
  }

  const { rows } = await connection.query(query)
  return rows[0];

}

const findOneByEmail = async(email) => { 
  const query = {
    text: `
        SELECT * FROM users 
        WHERE EMAIL = $1
    `,
    values:[email]
  }
  const {rows} = connection.query(query);
  return rows[0]
}

export const UserModel = {
  create,
  findOneByEmail
}
