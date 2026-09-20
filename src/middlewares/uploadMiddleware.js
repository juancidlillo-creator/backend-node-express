import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';

// Configuración de almacenamiento
const almacenamientoArchivos = multer.diskStorage({
    destination: async (req, file, callback) => {
        const carpetaDestino = 'uploads/';

        try {
            await fs.access(carpetaDestino);
        } catch (error) {
            try {
                await fs.mkdir(carpetaDestino, { recursive: true });
            } catch (errorCreacion) {
                return callback(errorCreacion, null);
            }
        }

        callback(null, carpetaDestino);
    },

    filename: (req, file, callback) => {
        const sufijoUnico = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extensionArchivo = path.extname(file.originalname);
        callback(null, sufijoUnico + extensionArchivo);
    }
});

// Filtro de archivos corregido
const filtroArchivos = (req, file, callback) => {
    const extensionesPermitidas = /jpeg|jpg|png|gif|webp/;

    const tipoMimeValido = extensionesPermitidas.test(file.mimetype);
    const extensionValida = extensionesPermitidas.test(path.extname(file.originalname).toLowerCase());

    if (tipoMimeValido && extensionValida) {
        // Archivo aceptado
        return callback(null, true);
    }

    // Archivo rechazado (pasamos un objeto Error al primer argumento)
    callback(new Error('Error: El archivo debe ser una imagen válida (jpeg, jpg, png, gif, webp)'), false);
};

// Middleware principal
export const uploadMiddleware = multer({
    storage: almacenamientoArchivos,
    fileFilter: filtroArchivos,
    limits: { 
        fileSize: 2 * 1024 * 1024 // 2 Megabytes
    }
});