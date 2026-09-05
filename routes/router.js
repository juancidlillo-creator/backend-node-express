import { Router } from 'express';
import { renderHome, renderDinamico, getStatus } from '../controllers/mainController.js';

const router = Router();

// Definición de endpoints y asociación con métodos del controlador
router.get('/', renderHome);
router.get('/vistaDinamica', renderDinamico);
router.get('/status', getStatus);

export default router;