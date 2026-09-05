import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Servir la página principal de contenido estático (HTML)
export const renderHome = (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
};


//Servir la vista dinámica mediante el motor de plantillas Handlebars (HBS)
export const renderDinamico = (req, res) => {
    res.render('index', {
        titulo: 'Vista Dinámica',
        mensaje: 'Hola, Este contenido fue inyectado desde el servidor Express.',
        estado: 'Activo'
    });
};

//Servir el estado del servidor en formato JSON
export const getStatus = (req, res) => {
    res.json({
        status: 'online',
        timestamp: new Date().toISOString(),
        nodeVersion: process.version
    });
};