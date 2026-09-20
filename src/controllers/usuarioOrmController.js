import { Client } from 'pg';
import Usuario from '../models/Usuario.js'; 

// Endpoint usando ORM (Sequelize)
// Obtiene los usuarios mediante abstracción de métodos.

export const obtenerUsuariosORM = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll({
        attributes: { exclude: ['password'] } // Excluye la contraseña por seguridad
        });

        res.status(200).json({
        metodo: 'ORM (Sequelize)',
        totalRegistros: usuarios.length,
        data: usuarios
        });
    } catch (error) {
        console.error('Error al obtener usuarios con ORM:', error);
        res.status(500).json({
        mensaje: 'Error al consultar usuarios mediante ORM',
        error: error.message
        });
    }
};


// Endpoint usando SQL Tradicional (Cliente 'pg')
// Realiza una consulta directa a la base de datos usando la URI de conexión.

export const obtenerUsuariosSQL = async (req, res) => {
    // Se utiliza la URL de conexión de tus variables de entorno o la cadena por defecto
    const connectionString = process.env.DATABASE_URL;
    const client = new Client({ connectionString });

    try {
        await client.connect();
        
        // Consulta SQL pura en formato String
        const query = 'SELECT id, nombre, email, estado, "createdAt", "updatedAt" FROM usuarios;';
        const result = await client.query(query);
        
        await client.end();

        res.status(200).json({
        metodo: 'SQL Tradicional (pg)',
        totalRegistros: result.rowCount,
        data: result.rows
        });
    } catch (error) {
        console.error('Error al obtener usuarios con SQL Tradicional:', error);
        res.status(500).json({
        mensaje: 'Error al consultar usuarios mediante SQL Tradicional',
        error: error.message
        });
    }
};