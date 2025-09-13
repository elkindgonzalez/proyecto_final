import { Router } from 'express';
import adoptionsController from '../controllers/adoptions.controller.js';

const router = Router();

router.get('/', adoptionsController.getAllAdoptions);
router.get('/:aid', adoptionsController.getAdoption);
router.post('/', adoptionsController.createAdoption); // 👈 ahora usa body

export default router;
