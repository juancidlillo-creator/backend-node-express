import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtención del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Definición de las rutas del directorio de logs y del archivo access.log
const logsDir = path.join(__dirname, '../logs');
const logFilePath = path.join(logsDir, 'access.log');

/**
 * Función asíncrona que registra una entrada en el archivo de texto access.log.
 * @param {string} metodo - Método HTTP utilizado (GET, POST, etc.)
 * @param {string} ruta - Ruta accedida por el cliente
 */
export const registrarAcceso = async (metodo, ruta) => {
    // Obtención de fecha y hora actual en formato estándar ISO
    const fechaHora = new Date().toISOString();
    
    // Estructura mínima requerida: fecha, hora, método y ruta accedida
    const logCreado = `[${fechaHora}] METODO: ${metodo} | RUTA: ${ruta}\n`;

    try {
        // Garantiza la existencia del directorio 'logs' si aún no existe
        await fs.mkdir(logsDir, { recursive: true });

        // Agrega la línea al final del archivo access.log usando fs.appendFile()
        await fs.appendFile(logFilePath, logCreado, 'utf-8');
    } catch (error) {
        // Manejo de errores
        console.error('Error al registrar log de acceso:', error.message);
    }
};