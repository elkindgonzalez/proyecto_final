// src/routes/adoption.router.js
import { Router } from "express";
import adoptionsController from "../controllers/adoptions.controller.js";

const router = Router();

// Crear adopción
router.post("/", adoptionsController.createAdoption);

// Listar adopciones
router.get("/", adoptionsController.getAllAdoptions);

// Obtener una adopción por ID
router.get("/:aid", adoptionsController.getAdoption);

export default router;
