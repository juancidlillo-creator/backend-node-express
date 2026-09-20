import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtención del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Definición de las rutas del directorio de logs
const logsDir = path.join(__dirname, '../../logs');
const accessLogPath = path.join(logsDir, 'access.log');
const transactionLogPath = path.join(logsDir, 'transactions.log');

/**
 * Función asíncrona que registra una entrada en el archivo de texto access.log.
 * @param {string} metodo - Método HTTP utilizado (GET, POST, etc.)
 * @param {string} ruta - Ruta accedida por el cliente
 */
export const registrarAcceso = async (metodo, ruta) => {
    const fechaHora = new Date().toISOString();
    const logCreado = `[${fechaHora}] METODO: ${metodo} | RUTA: ${ruta}\n`;

    try {
        await fs.mkdir(logsDir, { recursive: true });
        await fs.appendFile(accessLogPath, logCreado, 'utf-8');
    } catch (error) {
        console.error('Error al registrar log de acceso:', error.message);
    }
};

/**
 * Función asíncrona que registra transacciones fallidas con rollback en transactions.log.
 * (Módulo 7 - Tarea PLUS Lección 4)
 * @param {string} operacion - Nombre de la operación transaccional
 * @param {string} detalleError - Causa del error o rollback
 */
export const registrarFalloTransaccion = async (operacion, detalleError) => {
    const fechaHora = new Date().toISOString();
    const logFallo = `[${fechaHora}] TRANSACCION_FALLIDA | OPERACION: ${operacion} | ERROR: ${detalleError} | ACCION: ROLLBACK_EJECUTADO\n`;

    try {
        await fs.mkdir(logsDir, { recursive: true });
        await fs.appendFile(transactionLogPath, logFallo, 'utf-8');
    } catch (error) {
        console.error('Error al registrar log de transacción fallida:', error.message);
    }
};