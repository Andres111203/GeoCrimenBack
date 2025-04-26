import { Router } from 'express';
import { obtenerBarrioByCiudad, obtenerCiudadByPais, obtenerPaises } from '../controllers/ubicacion.controller.js';

const router = Router();

router.get("/paises", obtenerPaises);
router.get("/ciudades/:pais_id", obtenerCiudadByPais)
router.get("/barrios/:ciudad_id", obtenerBarrioByCiudad)

export default router;