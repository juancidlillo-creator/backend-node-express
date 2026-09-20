import { sequelize } from '../models/index.js';
import Usuario from '../models/Usuario.js';
import Pedido from '../models/Pedido.js';
import { registrarFalloTransaccion } from '../helpers/logHelper.js'; 

export const crearUsuarioYPedido = async (req, res) => {
    const t = await sequelize.transaction();

    try {
        const { nombre, email, password, descripcion, monto } = req.body;

        // Simulación de error si viene la query string ?forzarError=true
        if (req.query.forzarError === 'true') {
        throw new Error('Error forzado manualmente para validar Rollback');
        }

        // Crear Usuario
        const nuevoUsuario = await Usuario.create(
        { nombre, email, password },
        { transaction: t }
        );

        // Crear Pedido asociado
        const nuevoPedido = await Pedido.create(
        {
            descripcion,
            monto,
            usuarioId: nuevoUsuario.id
        },
        { transaction: t }
        );

        // Confirmar cambios
        await t.commit();

        res.status(201).json({
        success: true,
        mensaje: 'Usuario y Pedido creados exitosamente dentro de la transacción.',
        data: {
            usuario: {
            id: nuevoUsuario.id,
            nombre: nuevoUsuario.nombre,
            email: nuevoUsuario.email
            },
            pedido: nuevoPedido
        }
        });

    } catch (error) {
        // Revertir cambios en la BD
        await t.rollback();

        // Registro del Rollback en transactions.log
        await registrarFalloTransaccion('crearUsuarioYPedido', error.message);

        res.status(500).json({
        success: false,
        mensaje: 'Fallo en la transacción. Se ejecutó Rollback y no se guardaron cambios en la base de datos.',
        error: error.message
        });
    }
};