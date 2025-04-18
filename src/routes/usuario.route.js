import { Router } from "express";
import { obtenerUsuarios, agregarUsuarios } from "../controllers/usuario.controller.js";

const router = Router();

router.get("/usuarios", obtenerUsuarios);
router.post("/usuarios",agregarUsuarios);
// router.put("/usuarios/:id",modificarUsuarios);
// router.delete("/usuarios/:id", eliminarUsuarios);

export default router;