import {Router} from "express";
import { obtenerDireccionDesdeCoordenadas, agregarReporte,actualizarReporte,eliminarReporte, aprobarReporte, ObtenerReportesAprobados, obtenerReportesPendientes } from "../controllers/report.controller.js";

const router = Router();

//RUTES FROM REPORTS    
//router.get("/reportes", obtenerReportes);
router.post("/reportes", agregarReporte);
router.put("/reportes/:id", actualizarReporte);
router.delete("/reportes/:id", eliminarReporte);

//router.get("/reportes/coordenadas", obtenerCoordenadas);

router.post("/reportes/:id_reporte/aprobar", aprobarReporte);
router.get("/reportes/reportesPendientes", obtenerReportesPendientes)
router.get("reportes/reportesActivos", ObtenerReportesAprobados);
router.get("/geocoding", obtenerDireccionDesdeCoordenadas);


export default router;