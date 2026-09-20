// Importación de módulos y dependencias
import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Importación de middleware y router modular
import { loggerMiddleware } from './middlewares/loggerMiddleware.js';
import mainRouter from './routes/router.js';

// Inicialización de Express
const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de __dirname 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware de logs de peticiones
app.use(loggerMiddleware);

// Configuración del motor de vistas HBS
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Integración del router principal 
app.use('/', mainRouter);

// Inicio del servidor HTTP
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});