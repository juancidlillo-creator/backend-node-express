import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Configuración de almacenamiento en el disco duro
const almacenamientoArchivos = multer.diskStorage({
    destination: (req, file, callback) =>{
        const carpetaDestino = 'uploads/';

        // Si la carpeta no existe, la crea automáticamente
        if (!fs.existsSync(carpetaDestino)) {
            fs.mkdirSync(carpetaDestino, { recursive: true });
        }

        callback(null, carpetaDestino);
    },
    filename: (req, file, callback) => {
        // Genera un sufijo único usando la fecha actual y un número aleatorio
        const sufijoUnico = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extensionArchivo = path.extname(file.originalname);
        
        // Ejemplo de resultado: 17123456789-123456789.png
        callback(null, sufijoUnico + extensionArchivo);
    }
});

// Función para verificar que el archivo subido sea únicamente una imagen
const filtroArchivos = (req, file, callback) => {
    // Expresión regular con las extensiones de imágenes permitidas
    const extensionesPermitidas = /jpeg|jpg|png|gif|webp/;
    
    // Verificación de tipo MIME y de la extensión del archivo original
    const tipoMimeValido = extensionesPermitidas.test(file.mimetype);
    const extensionValida = extensionesPermitidas.test(path.extname(file.originalname).toLowerCase());

    if (tipoMimeValido && extensionValida) {
        return callback(null, true);
    }

    callback(new Error('Error: El archivo debe ser una imagen válida (jpeg, jpg, png, gif, webp)'));
};

// Configuración principal del middleware de subida
export const uploadMiddleware = multer({
    storage: almacenamientoArchivos,
    fileFilter: filtroArchivos,
    limits: { 
        fileSize: 2 * 1024 * 1024 // Límite de tamaño: 2 Megabytes
    }
});