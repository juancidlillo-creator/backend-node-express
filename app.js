// Carga de variables de entorno
import 'dotenv/config';

// Importación de módulos y dependencias
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Importación del middleware de logger
import { loggerMiddleware } from './middlewares/loggerMiddleware.js';

// Inicialización de Express
const app = express();
const PORT = process.env.PORT || 3000;
// Registrar el middleware de logs antes de definir las rutas
app.use(loggerMiddleware);
// Configuración de __dirname 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración del motor de plantillas HBS
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Ruta dinámica renderizada con HBS
app.get('/vistaDinamica', (req, res) => {
    res.render('index', {
        titulo: 'Vista Dinámica',
        mensaje: 'Hola, Este contenido fue inyectado desde el servidor Express.',
        estado: 'Activo'
    });
});

//Configuración del middleware express.static() para la carpeta /public
app.use(express.static(path.join(__dirname, 'public')));

//Ruta raíz (/): Envía el archivo HTML estático o una respuesta directa
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//Ruta de estado (/status): Devuelve un objeto en formato JSON
app.get('/status', (req, res) => {
    res.json({
        status: 'online',
        timestamp: new Date().toISOString(),
        nodeVersion: process.version,
        environment: process.env.NODE_ENV || 'development'
    });
});

// Ejecutar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});