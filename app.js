// Carga las variables de entorno desde el archivo .env a process.env
import 'dotenv/config';
// Importa el framework Express para la creación del servidor y gestión de rutas
import express from 'express';

// Inicializa la aplicación de Express
const app = express();

// Define el puerto del servidor desde process.env.PORT; si no existe, asigna 3000 por defecto
const PORT = process.env.PORT || 3000;

// Configura una ruta de prueba básica en la raíz
app.get('/', (req, res) => {
    res.send('Servidor en ejecución');
});

// Pone el servidor a escuchar en el puerto 3000 
app.listen(PORT, () => {
    console.log(`Servidor iniciado y escuchando en el puerto ${PORT}`);
});