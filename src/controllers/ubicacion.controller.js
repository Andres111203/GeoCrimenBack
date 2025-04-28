import db from "../database/db_connect.js"

export const obtenerPaises = async (req,res) => {
    const sql = 'SELECT * FROM pais ORDER BY nombre ASC'
    try {
        const [rows] = await db.query(sql);
        res.json({
            data:rows
        });
    } catch (error) {
        console.error('Se detecto un error', error.message);
        return res.status(500).json({
            error: error.message
        })
    } 
}

export const obtenerCiudadByPais = async (req,res) =>{
    const {pais_id} =req.params;
    const sql = 'SELECT * FROM ciudad WHERE Id_pais = ? ORDER BY nombre ASC'
    try {
        const [rows] = await db.query(sql, [pais_id]);
        res.json({
            data: rows
        })
    } catch (error) {
        console.error('Error al obtener ciudades');
        return res.status(500).json({
            error: error.message
        });
    } 
};

export const obtenerBarrioByCiudad = async (req,res) =>{
    const {ciudad_id}=req.params;
    const sql = 'SELECT * FROM barrio where Id_ciudad = ? ORDER BY nombre ASC'
    try {
        const [rows] = await db.query(sql, [ciudad_id]);
        res.json({
            data: rows
        })
    } catch (error) {
        console.log('Error al mostrar los barrios');
        return res.status(500).json({
            error: error.message
        });
    }
};