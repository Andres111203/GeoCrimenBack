import {Router} from "express";
import { obtenerReportes,agregarReporte,actualizarReporte,eliminarReporte, obtenerCoordenadas, aprobarReporte } from "../controllers/report.controller.js";

const router = Router();

//RUTES FROM REPORTS    
router.get("/reportes", obtenerReportes);
router.post("/reportes", agregarReporte);
router.put("/reportes/:id", actualizarReporte);
router.delete("/reportes/:id", eliminarReporte);

router.get("/reportes/coordenadas", obtenerCoordenadas);

router.patch(`/reportes/:id/aprobar`, aprobarReporte);


export default router;