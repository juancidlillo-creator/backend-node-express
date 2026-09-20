import { Router } from 'express';
import { verificarToken } from '../middlewares/authMiddleware.js';
import { uploadMiddleware } from '../middlewares/uploadMiddleware.js';

const router = Router();

// Ruta protegida 1: Consultar perfil privado del usuario
router.get('/perfil', verificarToken, (req, res) => {
    res.json({
        mensaje: 'Acceso permitido a perfil privado',
        usuario: req.usuario
    });
});

// Ruta protegida 2: Subida de archivos de perfil (combina autenticación y multer)
router.post('/upload-foto', verificarToken, uploadMiddleware.single('imagen'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No se ha adjuntado ninguna imagen' });
    }

    res.json({
        mensaje: 'Imagen subida exitosamente por usuario autenticado',
        archivo: req.file.filename,
        usuario: req.usuario
    });
});

export default router;