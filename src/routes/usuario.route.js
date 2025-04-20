import { Router } from "express";
import { obtenerUsuarios, agregarUsuarios, eliminarUsuario, actualizarUsuario } from "../controllers/usuario.controller.js";

const router = Router();

router.get("/usuarios", obtenerUsuarios);
router.post("/usuarios",agregarUsuarios);
router.put("/usuarios/:id",actualizarUsuario);
router.delete("/usuarios/:id", eliminarUsuario);

export default router;