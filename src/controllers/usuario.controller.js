import db from "../database/db_connect.js"
import bcrypt from 'bcryptjs';
import axios from "axios";


export const obtenerUsuarios = async (req, res) => {
    const sql = 'SELECT * FROM Usuario'
    try {
        const [rows] = await db.query(sql);
        console.log(rows);
        res.json({
            data: rows
        });
    } catch (error) {
        console.log(error);
        console.error('Error al momento de obtener los usuarios');
        return res.status(500).json({ error: "Error interno al obtener usuarios" });
    }
};

export const agregarUsuarios = async (req, res) => {
    
    const {
        nombre,
        apellido,
        email,
        contrasenia,
        rol,
        fechaNacimiento,
         } = req.body
    const hashedPassword = await bcrypt.hash(contrasenia, 10);

    const fechaRegistro = new Date();
    const sql = 'INSERT INTO Usuario (nombre,apellido,email,contrasenia,rol,fechaRegistro,fechaNacimiento) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id_usuario';
    try {
        const result = await db.query(sql, [
            nombre,
            apellido,
            email,
            hashedPassword,
            rol,
            fechaRegistro,
            fechaNacimiento
          ]);
        res.status(201).json({
            message: "Usuario creado",
            id_usuario_insertado: result.rows[0].id_usuario
        });
        console.log("Usuario insertado con éxito:",  result.rows[0].id_usuario);
    } catch (error) {
        console.error("Error al insertar nuevo usuario:", error);
        return res.status(500).json(
            {
                message: "Error interno al insertar usuario",
                error: error.message
            });

    }
};
export const eliminarUsuario = async (req, res) => {
    const { id_usuario } = req.params;
    const sql = 'DELETE FROM usuario WHERE id_usuario = $1';
  
    try {
      await db.query(sql, [id_usuario]);
      res.status(200).json({
        message: 'Usuario eliminado con éxito'
      });
    } catch (error) {
      console.error('Error al eliminar al usuario:', error);
      return res.status(500).json({
        error: error.message
      });
    }
  };

export const actualizarUsuario = async (req, res) => {
    const { id } = req.params;
    const {
        nombre,
        apellido,
        email,
        contrasenia,
        rol,
        fechaNacimiento } = req.body;

    const sql = 'UPDATE usuario set nombre = ?, apellido = ?, email = ?, contrasenia = ?, rol = ?, fechaNacimiento = ? WHERE Id_usuario = ?';
    try {
        await db.query(sql, [
            nombre,
            apellido,
            email,
            contrasenia,
            rol,
            fechaNacimiento,
            id]);

        res.json({ message: 'Actualizado con exito' });

    } catch (error) {
        console.error('No se pudo llevar a cabo la actualizacion del usuario');
        return res.status(500).json({
            message: 'Error interno para actualizar usuario',
            error: error.message
        });
    }

};

export const validarLogin = async(req,res) =>{
    const{email,contrasenia, token}=req.body;
    if (!token) {
        return res.status(400).json({ mensaje: "Falta el token de reCAPTCHA" });
    }
    
    try {

        const secretKey = "6Ld2xVorAAAAAMRqCio1cPK9DzTn74oGAkATeFIc"; // TU CLAVE SECRETA

        const { data } = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`
        );

        if (!data.success) {
        return res.status(401).json({ mensaje: "reCAPTCHA inválido" });
        }
        const sql = 'SELECT * FROM Usuario WHERE email = $1'
        const result = await db.query(sql, [email]);
        const rows = result.rows;
        
        if(rows.length === 0)return res.status(401).json({message: 'Correo o constrasenia incorrectos'});
        const usuario = rows[0];
        const isPasswordValid = await bcrypt.compare(contrasenia, usuario.contrasenia);
        // if (!isPasswordValid) {
        //     return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
        // }
        console.log('Usuario encontrado:', rows[0]);
        res.status(200).json({
            mensaje: 'Inicio de sesión exitoso',
            id_usuario: rows[0].id_usuario
        });
        console.log('Usuario logueado con éxito:', rows[0].id_usuario);
    } catch (error) {
        console.error('Error en validarLogin:', error);
        res.status(500).json({ mensaje: 'Error del servidor' });
    }
};

export const obtenerDatosUsuarioPorId = async (req, res) => {
    const { id_usuario } = req.params;
    const sql = `
      SELECT 
        id_usuario, 
        nombre, 
        apellido, 
        email, 
        contrasenia 
      FROM Usuario 
      WHERE id_usuario = $1
    `;
  
    try {
      const result = await db.query(sql, [id_usuario]);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
  
      res.json({ data: result.rows[0] });
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
      return res.status(500).json({ error: "Error interno al obtener datos del usuario" });
    }
  };
  