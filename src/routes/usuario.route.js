import { Router } from "express";
import { obtenerUsuarios, agregarUsuarios, eliminarUsuario, actualizarUsuario, validarLogin } from "../controllers/usuario.controller.js";

const router = Router();

router.get("/usuarios", obtenerUsuarios);
router.post("/usuarios",agregarUsuarios);
router.put("/usuarios/:id",actualizarUsuario);
router.delete("/usuarios/:id", eliminarUsuario);

router.post("/login", validarLogin);

export default router;