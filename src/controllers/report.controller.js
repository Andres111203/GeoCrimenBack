import db from "../database/db_connect.js"

export const obtenerReportes = async(req,res) =>{
    const sql = 'SELECT * FROM reporte'
    try{
        const [rows] = await db.query(sql);
            res.json({
                data: rows
            });
        }catch(err){
            console.error('Error al momento de obtener el reporte');
            return res.status(500).json({error: "No se pudo generar el listado de los reportes"});
        } 
};

export const agregarReporte = async(req,res) =>{
    const {id_usuario, Id_ubicacion, id_crimen, descripcion, ubi_lat, ubi_lng, Id_estado} = req.body;
    const sql = 'INSERT INTO reporte ( id_usuario, Id_ubicacion, id_crimen, descripcion, ubi_lat, ubi_lng, Id_estado) VALUES (?,?,?,?,?,?,?)';
    try {
        const [rows] = await db.query(sql, [id_usuario, Id_ubicacion, id_crimen, descripcion, ubi_lat, ubi_lng, Id_estado]);
        res.status(201).json({
            message: "Reporte creado",
            id_insertado: rows.insertId
        });  
    
    }catch (error) {
        console.error("Error al insertar reporte:", error); // importante
        return res.status(500).json({
            message: "Error interno al insertar reporte",
            error: error.message // opcional, para depurar
        });    
    }
};

export const eliminarReporte = ()=>{

};

export const actualizarReporte = () =>{

};