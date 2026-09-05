// Importamos la función de registro del helper
import { registrarAcceso } from '../helpers/logHelper.js';

// Middleware para Express que intercepta todas las peticiones entrantes y llama a la función de persitencia en archivo plano.

export const loggerMiddleware = async (req, res, next) => {
    // Capturamos el método de la petición (GET, POST, etc.)
    const metodo = req.method;
    
    // Capturamos la ruta a la que se está accediendo
    const rutaAccedida = req.originalUrl || req.url;

    // Ejecutamos la función asíncrona de guardado
    await registrarAcceso(metodo, rutaAccedida);

    // Damos paso a la siguiente función o middleware en Express
    next();
};