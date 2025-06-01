import db from "../database/db_connect.js"
import bcrypt from 'bcryptjs';


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
        barrio } = req.body
    const hashedPassword = await bcrypt.hash(contrasenia, 10);

    const fechaRegistro = new Date();
    const sql = 'INSERT INTO Usuario (nombre,apellido,email,contrasenia,rol,fechaRegistro, fechaNacimiento) VALUES (?,?,?,?,?,?,?)';
    try {
        const [rows] = await db.query(sql,
            [
                nombre,
                apellido,
                email,
                hashedPassword,
                rol,
                fechaRegistro,
                fechaNacimiento
            ]
        )
        res.status(201).json({
            message: "Usuario creado",
            id_insertado: rows.insertId
        });
        console.log("Usuario insertado con éxito:", rows.insertId);
    } catch (error) {
        console.error("Error al insertar nuevo usuario:", error);
        return res.status(500).json(
            {
                message: "Error interno al insertar reporte",
                error: error.message
            });

    }
};

export const eliminarUsuario = async (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE  FROM usuario WHERE Id_usuario = ?'
    try {
        await db.query(sql, [id])
        res.status(201).json({
            message: 'Usuario eliminado con exito'
        });
    } catch (error) {
        console.error('Error al eliminar al usuario');
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
    const{email,contrasenia}=req.body;
    const sql = 'SELECT * FROM Usuario WHERE email = ? AND contrasenia = ?'
    try {
        const [rows] = await db.query(sql, [email, contrasenia])
        if(rows.length === 0)return res.status(401).json({message: 'Correo o constrasenia incorrectos'});
        const usuario = rows[0];
        const isPasswordValid = await bcrypt.compare(contrasenia, usuario.contrasenia);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
        }

        res.status(200).json({
            mensaje: 'Inicio de sesión exitoso',
            id_usuario: usuario.Id_usuario
        });
        console.log('Usuario logueado con éxito:', usuario.Id_usuario);
    } catch (error) {
        console.error('Error en validarLogin:', error);
        res.status(500).json({ mensaje: 'Error del servidor' });
    }
};