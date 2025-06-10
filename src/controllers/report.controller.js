import db from "../database/db_connect.js"
import fetch from 'node-fetch'; 


let mostrarReporte = null;
export const obtenerReportesPendientes = async (req, res) => {
    const sql = 'SELECT * FROM Reporte WHERE id_estado = $1 ORDER BY fecha_reporte DESC';
    try {
      const result = await db.query(sql, [2]);  
      res.json({
        data: result.rows
      });
      console.log(result.rows);
    } catch (err) {
      console.error('Error al momento de obtener el reporte:', err);
      return res.status(500).json({ error: "No se pudo generar el listado de los reportes" });
    }
};
  

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
    const {
      id_usuario,
      ubicacion_reporte,
      id_crimen,
      descripcion,
      fecha_reporte,
      ubi_lat,
      ubi_lng,
    } = req.body;
    console.log("Datos del reporte:", req.body);
    const id_estado = 2; 
  
    const sql = `
      INSERT INTO Reporte (
        id_usuario,
        ubicacion_reporte,
        id_crimen,
        descripcion,
        id_estado,
        fecha_reporte,
        ubi_lat,
        ubi_lng
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id_reporte
    `;
  
    try {
      const result = await db.query(sql, [
        id_usuario,
        ubicacion_reporte,
        id_crimen,
        descripcion,
        id_estado,
        fecha_reporte,
        ubi_lat,
        ubi_lng
      ]);
  
      res.status(201).json({
        message: "Reporte creado",
        id_reporte_insertado: result.rows[0].id_reporte
      });
  
    } catch (error) {
      console.error('Error en insertar reporte:', error);
      res.status(500).json({ error: 'Error al insertar el reporte' });
    }
  };
  

export const eliminarReporte = ()=>{

};

export const actualizarReporte = () =>{

};

export const aprobarReporte = async (req, res) => {
    const { id_reporte } = req.params;
    const { comentario } = req.body;
    console.log("ID del reporte a aprobar:", id_reporte);
  
    try {
      const insertSql = 'INSERT INTO ReaccionesPorReporte (id_reporte, id_tipoReaccion, comentario) VALUES ($1, $2, $3)';
      const insertResult = await db.query(insertSql, [id_reporte, 1, comentario]);
  
      if (insertResult.rowCount > 0) {
        const mostrarSql = 'SELECT mostrarReporte($1) AS mostrar';
        const mostrarResult = await db.query(mostrarSql, [id_reporte]);
  
        const mostrarReporte = mostrarResult.rows[0].mostrar;
  
        if (mostrarReporte) {
          console.log("El reporte se puede mostrar:", mostrarReporte);
  
          const updateSql = 'UPDATE Reporte SET id_estado = 1 WHERE id_reporte = $1';
          const updateResult = await db.query(updateSql, [id_reporte]);
  
          console.log("Reporte aprobado:", updateResult.rowCount);
          res.status(200).json({ message: "Reporte aprobado exitosamente", mostrarReporte });
        } else {
          res.status(200).json({ message: "Reporte aprobado exitosamente", mostrarReporte: false });
        }
      } else {
        res.status(404).json({ error: "No se pudo insertar la reacción" });
      }
  
    } catch (error) {
      console.error('Error al aprobar el reporte:', error);
      res.status(500).json({ error: 'Error al aprobar el reporte' });
    }
  };
  
  export const rechazarReporte = async (req, res) => {
    const { id_reporte } = req.params;
    const { comentario } = req.body;
  
    try {
      
      const insertSql = `
        INSERT INTO ReaccionesPorReporte (id_reporte, id_tipoReaccion, comentario) 
        VALUES ($1, $2, $3)
        RETURNING *
      `;
      const insertResult = await db.query(insertSql, [id_reporte, 2, comentario]);
  
      if (insertResult.rowCount > 0) {
        
        const funcionSql = `SELECT mostrarReporte($1) AS mostrar`;
        const funcionResult = await db.query(funcionSql, [id_reporte]);
        const mostrarReporte = funcionResult.rows[0].mostrar;
  
        if (!mostrarReporte) {
          const updateSql = `UPDATE Reporte SET id_estado = 3 WHERE id_reporte = $1`;
          await db.query(updateSql, [id_reporte]);
        }
  
        res.status(200).json({
          message: "Reporte rechazado exitosamente",
          mostrarReporte
        });
      } else {
        res.status(404).json({ error: "Reporte no encontrado" });
      }
    } catch (error) {
      console.error('Error al rechazar el reporte:', error);
      res.status(500).json({ error: 'Error al rechazar el reporte' });
    }
  };
  
export const ObtenerReportesAprobados = async (req, res) => {
    const sql = `
      SELECT 
        id_reporte, 
        id_crimen, 
        fecha_reporte, 
        ubicacion_reporte, 
        descripcion,
        ubi_lat,
        ubi_lng 
      FROM Reporte 
      WHERE id_estado = $1 
      ORDER BY fecha_reporte DESC
    `;
  
    try {
      const result = await db.query(sql, [1]); 
      res.json({
        data: result.rows
      });
    } catch (err) {
      console.error('Error al momento de obtener los reportes aprobados:', err);
      return res.status(500).json({ error: "No se pudo generar el listado de los reportes aprobados" });
    }
};
  
export const agregarArchivoPorReporte = async (req, res) => {
    const { id_reporte, tipo_archivo, url_archivo } = req.body;
  
    try {
      const sql = 'INSERT INTO archivoporreporte (id_reporte, tipo_archivo, url_archivo) VALUES ($1, $2, $3)';
      await db.query(sql, [id_reporte, tipo_archivo, url_archivo]);
  
      res.status(201).json({ message: "Archivo vinculado al reporte" });
    } catch (error) {
      console.error("Error al insertar archivo:", error);
      res.status(500).json({ error: "Error al insertar archivo por reporte" });
    }
  };
  

  export const obtenerArchivosPorReporte = async (req, res) => {
    const { idReporte } = req.params;
    const sql = 'SELECT * FROM ArchivoPorReporte WHERE id_reporte = $1';
  
    try {
      const result = await db.query(sql, [idReporte]);
      res.json({ data: result.rows });
    } catch (error) {
      console.error('Error al obtener archivos por reporte:', error);
      res.status(500).json({ error: "Error al obtener archivos" });
    }
  };
  

  export const obtenerReportesPorFecha = async (req, res) => {
    const { fecha_reporte } = req.query;
  
    if (!fecha_reporte) {
      return res.status(400).json({ error: "La fecha es obligatoria" });
    }
  
    const inicioDia = `${fecha_reporte} 00:00:00`;
    const finDia = `${fecha_reporte} 23:59:59`;
  
    const sql = `
      SELECT * FROM Reporte 
      WHERE fecha_reporte BETWEEN $1 AND $2 AND id_estado = 2
    `;
  
    try {
      const result = await db.query(sql, [inicioDia, finDia]);
      res.json({ data: result.rows });
    } catch (error) {
      console.error("Error al obtener reportes por fecha:", error);
      res.status(500).json({ error: "Error al obtener reportes" });
    }
  };
  export const obtenerReportesRegistrados = async (req, res) => {
    const sql = `
      SELECT 
        id_reporte,
        CASE 
            WHEN id_crimen = 1 THEN 'Hurto'
            WHEN id_crimen = 2 THEN 'Homicidio' 
        END AS tipo_crimen,
        descripcion, 
        ubicacion_reporte, 
        fecha_reporte, 
        CASE
            WHEN id_estado = 1 THEN 'Aprobado'
            WHEN id_estado = 2 THEN 'Pendiente'
            WHEN id_estado = 3 THEN 'Rechazado'
        END AS estado_reporte
      FROM Reporte
      ORDER BY fecha_reporte DESC
    `;
  
    try {
      const result = await db.query(sql);
      res.status(200).json({ data: result.rows }); 
    } catch (error) {
      console.error("Error al mostrar reporte de hechos:", error);
      throw new Error("Error al mostrar reporte de hechos");
    }
  };