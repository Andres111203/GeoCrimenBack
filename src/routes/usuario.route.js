import { Router } from "express";
import { obtenerUsuarios, agregarUsuarios, eliminarUsuario } from "../controllers/usuario.controller.js";

const router = Router();

router.get("/usuarios", obtenerUsuarios);
router.post("/usuarios",agregarUsuarios);
// router.put("/usuarios/:id",modificarUsuarios);
router.delete("/usuarios/:id", eliminarUsuario);

export default router;