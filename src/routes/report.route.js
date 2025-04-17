import {Router} from "express";
import { obtenerReportes,agregarReporte,actualizarReporte,eliminarReporte } from "../controllers/report.controller.js";

const router = Router();

//RUTES FROM REPORTS    
router.get("/reportes", obtenerReportes);
router.post("/reportes", agregarReporte);
router.put("/reportes/:id", actualizarReporte);
router.delete("/reportes/:id", eliminarReporte);

export default router;