import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";


const router = Router();

// /api/register
router.post('/register', UserController.register)
router.post('/login', UserController.login)   // /api/login

export default router;