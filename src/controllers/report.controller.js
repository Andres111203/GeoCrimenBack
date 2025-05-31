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

export const obtenerCoordenadas = async (req, res) => {
    const sql = 'SELECT ubi_lat, ubi_lng from reporte'
    try {
        const [rows] = await db.query(sql);
        res.json({ data: rows });
      } catch (err) {
        console.error("Error al obtener coordenadas:", err);
        return res.status(500).json({ error: "No se pudieron obtener las coordenadas" });
      }
};

export const agregarReporte = async (req, res) => {
    // const {id_usuario, id_crimen, descripcion, ubi_lat, ubi_lng, Id_estado, Id_barrio} = req.body;


    const {
        id_usuario,
        ubicacion_reporte,
        id_crimen,
        descripcion,
        ubi_lat,
        ubi_lng,
        fecha_reporte
    } = req.body;

    
    const id_estado = 2;  //por defecto el estado del reporte es "pendiente"
    // const Id_barrio = 1;
    
    const sql = 'INSERT INTO Reporte ( id_usuario, ubicacion_reporte, id_crimen, descripcion, ubi_lat, ubi_lng, id_estado, fecha_reporte) VALUES (?,?,?,?,?,?,?,?)';
    try {
        const [rows] = await db.query(sql, [id_usuario, ubicacion_reporte, id_crimen, descripcion, ubi_lat, ubi_lng, id_estado, fecha_reporte]);
        res.status(201).json({
            message: "Reporte creado",
            id_reporte_insertado: rows.insertId
        });  
    
    } catch (error) {
        console.error('Error en insertar reporte:', error); // <-- esto muestra el error real
        res.status(500).json({ error: 'Error al insertar el reporte' });
      }
      
};

export const eliminarReporte = ()=>{

};

export const actualizarReporte = () =>{

};

export const aprobarReporte = async(req, res) =>{
    const { id } = req.params;
    const sql = 'INSERT INTO ReaccionesPorReporte (id_reporte, id_tipoReaccion, comentario) VALUES (?, ?, ?, ?, ?)';
    const {comentario} = req.body;
    const [rows] = await db.query(sql, [id, 1, comentario]);

}