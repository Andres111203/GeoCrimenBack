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
        id_ubicacion,
        id_crimen,
        descripcion,
        ubi_lat,
        ubi_lng,
        //Id_barrio
    } = req.body;

    
    const id_estado = 2;  //por defecto el estado del reporte es "pendiente"
    // const Id_barrio = 1;
    
    const sql = 'INSERT INTO Reporte ( id_usuario, id_ubicacion, id_crimen, descripcion, ubi_lat, ubi_lng, id_estado) VALUES (?,?,?,?,?,?,?)';
    try {
        const [rows] = await db.query(sql, [id_usuario, id_ubicacion, id_crimen, descripcion, ubi_lat, ubi_lng, id_estado]);
        res.status(201).json({
            message: "Reporte creado",
            id_insertado: rows.insertId
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