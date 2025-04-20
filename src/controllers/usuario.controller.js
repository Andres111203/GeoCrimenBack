import db from "../database/db_connect.js"

export const obtenerUsuarios = async (req, res) => {
    const sql = 'SELECT * FROM usuario'
    try {
        const [rows] = await db.query(sql);
        res.json({
            data: rows
        });
    } catch (error) {
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
        fechaRegistro,
        fechaNacimiento } = req.body
    const sql = 'INSERT INTO usuario (nombre,apellido,email,contrasenia,rol,fechaRegistro, fechaNacimiento) VALUES (?,?,?,?,?,?,?)';
    try {
        const [rows] = await db.query(sql,
            [
                nombre,
                apellido,
                email,
                contrasenia,
                rol,
                fechaRegistro,
                fechaNacimiento
            ]
        )
        res.status(201).json({
            message: "Usuario creado",
            id_insertado: rows.insertId
        });
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
        const [rows] = await db.query(sql, [id])
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
        fechaRegistro,
        fechaNacimiento } = req.body;

    const sql = 'UPDATE usuario set nombre = ?, apellido = ?, email = ?, contrasenia = ?, rol = ?, fechaRegistro = ?, fechaNacimiento = ? WHERE Id_usuario = ?';
    try {
        const [rows] = await db.query(sql, [
            nombre,
            apellido,
            email,
            contrasenia,
            rol,
            fechaRegistro,
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