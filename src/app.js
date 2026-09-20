// Importación de módulos y dependencias
import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Importar conexión y modelos
import { sequelize } from './models/index.js';

// Importación de middleware y router modular
import { loggerMiddleware } from './middlewares/loggerMiddleware.js';
// Importar rutas
import mainRouter from './routes/router.js';
import usuarioRoutes from './routes/usuarioRouters.js'

// Inicialización de Express
const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de __dirname 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares para parsing de Body (CRUCIAL para los POST/PUT)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de logs de peticiones (Módulo 6 - log.txt)
app.use(loggerMiddleware);

// Configuración del motor de vistas HBS (Módulo 6)
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Servir archivos estáticos (Módulo 6)
app.use(express.static(path.join(__dirname, 'public')));

// Integración del router principal 
app.use('/', mainRouter);
// Registrar rutas de la API
app.use('/api/usuarios', usuarioRoutes);


// Inicio del servidor HTTP
const iniciarServidor = async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log(' Conexión a PostgreSQL establecida y tablas sincronizadas correctamente');

        app.listen(PORT, () => {
            console.log(` Servidor activo ejecutándose en http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error(' Error al conectar a la base de datos:', error);
    }
};

iniciarServidor();