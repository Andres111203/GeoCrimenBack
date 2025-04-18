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