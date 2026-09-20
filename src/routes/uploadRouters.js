import { Router } from 'express';
import { uploadMiddleware } from '../middlewares/uploadMiddleware.js';
import { subirArchivo } from '../controllers/uploadController.js';

const router = Router();

// Endpoint POST /api/upload
// El nombre del campo en el form-data debe ser "archivo"
router.post('/', uploadMiddleware.single('archivo'), subirArchivo);

export default router;