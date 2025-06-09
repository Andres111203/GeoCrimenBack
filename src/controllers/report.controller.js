import db from "../database/db_connect.js"
import fetch from 'node-fetch'; 


let mostrarReporte = null;
export const obtenerReportesPendientes = async(req,res) =>{
    const sql = 'SELECT * FROM Reporte WHERE id_estado = 2 ORDER BY fecha_reporte DESC';
    try{
        const [rows] = await db.query(sql);
            res.json({
                data: rows
            });
        console.log(rows);
        }catch(err){
            console.error('Error al momento de obtener el reporte');
            return res.status(500).json({error: "No se pudo generar el listado de los reportes"});
        } 
};

// export const obtenerCoordenadas = async (req, res) => {
//     const sql = 'SELECT ubi_lat, ubi_lng from reporte'
//     try {
//         const [rows] = await db.query(sql);
//         res.json({ data: rows });
//       } catch (err) {
//         console.error("Error al obtener coordenadas:", err);
//         return res.status(500).json({ error: "No se pudieron obtener las coordenadas" });
//       }
// };

export const obtenerDireccionDesdeCoordenadas = async (req, res) => {
    const { lat, lng } = req.query;
    const apiKey = "590f7aa7a4d8496782ccda3353b3c6e4";

    if (!lat || !lng) {
        return res.status(400).json({ error: "Latitud y longitud son requeridas" });
    }

    try {
        const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apiKey}&language=es`
        );

        const data = await response.json();

        if (data && data.results && data.results.length > 0) {
            const address = data.results[0].formatted;
            return res.status(200).json({ address });
        } else {
            return res.status(404).json({ error: "No se encontró dirección para esas coordenadas" });
        }
    } catch (error) {
        console.error("Error en OpenCage:", error);
        return res.status(500).json({ error: "Error al consultar OpenCage" });
    }
};

export const agregarReporte = async (req, res) => {
    // const {id_usuario, id_crimen, descripcion, ubi_lat, ubi_lng, Id_estado, Id_barrio} = req.body;


    const {
        id_usuario,
        ubicacion_reporte,
        id_crimen,
        descripcion,
        fecha_reporte,
        ubi_lat,
        ubi_lng,
    } = req.body;

    
    const id_estado = 2;  //por defecto el estado del reporte es "pendiente"
    // const Id_barrio = 1;
    
    const sql = 'INSERT INTO Reporte ( id_usuario, ubicacion_reporte, id_crimen, descripcion, id_estado, fecha_reporte, ubi_lat, ubi_lng) VALUES (?,?,?,?,?,?,?,?)';
    try {
        const [rows] = await db.query(sql, [id_usuario, ubicacion_reporte, id_crimen, descripcion, id_estado, fecha_reporte, ubi_lat, ubi_lng]);
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
    const { id_reporte } = req.params;
    const sql = 'INSERT INTO ReaccionesPorReporte (id_reporte, id_tipoReaccion, comentario) VALUES (?, ?, ?)';
    const {comentario} = req.body;
    const [rows] = await db.query(sql, [id_reporte, 1, comentario]);
    if (rows.affectedRows > 0) {
        const sql = "SELECT mostrarReporte(?) AS mostrar" 
        const[rows] = await db.query(sql, [id_reporte])
        mostrarReporte = rows[0].mostrar;
        if(mostrarReporte) {
            const sql = "UPDATE Reporte SET id_estado = 1 WHERE id_reporte = ?";
            await db.query(sql, [id_reporte]);
            res.status(200).json({ message: "Reporte aprobado exitosamente", mostrarReporte });
        }
        else{
           mostrarReporte = false;
              res.status(200).json({ message: "Reporte aprobado exitosamente", mostrarReporte }); 
        }
        
    } else {
        res.status(404).json({ error: "Reporte no encontrado" });
    }

}

export const rechazarReporte = async(req, res) =>{
    const { id_reporte } = req.params;
    const sql = 'INSERT INTO ReaccionesPorReporte (id_reporte, id_tipoReaccion, comentario) VALUES (?, ?, ?)';
    const {comentario} = req.body;
    const [rows] = await db.query(sql, [id_reporte, 2, comentario]);
    if (rows.affectedRows > 0) {
        const sql = "SELECT mostrarReporte(?) AS mostrar" 
        const[rows] = await db.query(sql, [id_reporte])
        mostrarReporte = rows[0].mostrar;
        if(!mostrarReporte) {
            sql = "UPDATE Reporte SET id_estado = 3 WHERE id_reporte = ?";
            await db.query(sql, [id_reporte]);

            res.status(200).json({ message: "Reporte rechazado exitosamente", mostrarReporte });
        }
        
        
    } else {
        res.status(404).json({ error: "Reporte no encontrado" });
    }

}

export const ObtenerReportesAprobados = async (req, res) => {
    const sql = "SELECT id_reporte, id_crimen, fecha_reporte, ubicacion_reporte, descripcion, ubi_lat, ubi_lng FROM Reporte WHERE id_estado = 1 ORDER BY fecha_reporte DESC";
    try {
        const [rows] = await db.query(sql);
        res.json({
            data: rows
        });
    } catch (err) {
        console.error('Error al momento de obtener los reportes aprobados');
        return res.status(500).json({ error: "No se pudo generar el listado de los reportes aprobados" });
    }
}

export const agregarArchivoPorReporte = async (req, res) => {
    const { id_reporte, tipo_archivo, url_archivo } = req.body;
  
    try {
      const sql = 'INSERT INTO archivosPorReporte (id_reporte, tipo_archivo, url_archivo) VALUES (?, ?, ?)';
      await db.query(sql, [id_reporte, tipo_archivo, url_archivo]);
  
      res.status(201).json({ message: "Archivo vinculado al reporte" });
    } catch (error) {
      console.error("Error al insertar archivo:", error);
      res.status(500).json({ error: "Error al insertar archivo por reporte" });
    }
  };

export const obtenerArchivosPorReporte = async (req, res) => {
    const { id_reporte } = req.params;
  
    try {
      const sql = 'SELECT * FROM archivosPorReporte WHERE id_reporte = ?';
      const [rows] = await db.query(sql, [id_reporte]);
  
      if (rows.length > 0) {
        res.json({ data: rows });
      } else {
        res.status(404).json({ message: "No se encontraron archivos para este reporte" });
      }
    } catch (error) {
      console.error("Error al obtener archivos por reporte:", error);
      res.status(500).json({ error: "Error al obtener archivos por reporte" });
    }
  }
  