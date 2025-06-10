import {Router} from "express";
import { obtenerDireccionDesdeCoordenadas, agregarReporte,actualizarReporte,eliminarReporte, aprobarReporte, ObtenerReportesAprobados, obtenerReportesPendientes, agregarArchivoPorReporte, obtenerArchivosPorReporte, obtenerReportesPorFecha, rechazarReporte, obtenerReportesRegistrados } from "../controllers/report.controller.js";

const router = Router();

//RUTES FROM REPORTS    
//router.get("/reportes", obtenerReportes);
router.post("/reportes", agregarReporte);
router.put("/reportes/:id", actualizarReporte);
router.delete("/reportes/:id", eliminarReporte);

//router.get("/reportes/coordenadas", obtenerCoordenadas);

router.post("/reportes/:id_reporte/aprobar", aprobarReporte);
router.post("/reportes/:id_reporte/rechazar", rechazarReporte);
router.get("/reportes/reportesPendientes", obtenerReportesPendientes)
router.get("/reportes/reportesAprobados", ObtenerReportesAprobados);
router.get("/geocoding", obtenerDireccionDesdeCoordenadas);
router.post("/reportes/archivoPorReporte", agregarArchivoPorReporte);
router.get("/reportes/obtenerArchivoPorReporte/:id_reporte", obtenerArchivosPorReporte);
router.get("/reportes/obtenerReportesPorFecha", obtenerReportesPorFecha);
router.get("/reportes/obtenerReportesRegistrados", obtenerReportesRegistrados);



export default router;