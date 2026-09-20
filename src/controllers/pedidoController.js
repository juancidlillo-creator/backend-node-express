import { Pedido, Usuario } from '../models/index.js';

// GET /api/pedidos
export const obtenerPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.findAll({
        include: [{ model: Usuario, as: 'usuario', attributes: ['id', 'nombre', 'email'] }]
        });

        res.status(200).json({
        success: true,
        total: pedidos.length,
        data: pedidos
        });
    } catch (error) {
        res.status(500).json({
        success: false,
        message: 'Error al obtener los pedidos',
        error: error.message
        });
    }
};

// GET /api/pedidos/:id
export const obtenerPedidoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const pedido = await Pedido.findByPk(id, {
        include: [{ model: Usuario, as: 'usuario', attributes: ['id', 'nombre', 'email'] }]
        });

        if (!pedido) {
        return res.status(404).json({ success: false, message: 'Pedido no encontrado' });
        }

        res.status(200).json({ success: true, data: pedido });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener el pedido', error: error.message });
    }
};

// POST /api/pedidos
export const crearPedido = async (req, res) => {
    try {
        const { descripcion, monto, usuarioId, estado } = req.body;

        // Verificar si el usuario existe antes de crear el pedido
        const usuarioExiste = await Usuario.findByPk(usuarioId);
        if (!usuarioExiste) {
        return res.status(404).json({ success: false, message: 'El usuario especificado no existe' });
        }

        const nuevoPedido = await Pedido.create({
        descripcion,
        monto,
        usuarioId,
        estado: estado || 'pendiente'
        });

        res.status(201).json({
        success: true,
        message: 'Pedido creado exitosamente',
        data: nuevoPedido
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al crear el pedido', error: error.message });
    }
};

// PUT /api/pedidos/:id
export const actualizarPedido = async (req, res) => {
    try {
        const { id } = req.params;
        const { descripcion, monto, estado } = req.body;

        const pedido = await Pedido.findByPk(id);
        if (!pedido) {
        return res.status(404).json({ success: false, message: 'Pedido no encontrado' });
        }

        await pedido.update({
        ...(descripcion && { descripcion }),
        ...(monto && { monto }),
        ...(estado && { estado })
        });

        res.status(200).json({
        success: true,
        message: 'Pedido actualizado exitosamente',
        data: pedido
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al actualizar el pedido', error: error.message });
    }
};

// DELETE /api/pedidos/:id
export const eliminarPedido = async (req, res) => {
    try {
        const { id } = req.params;

        const filasEliminadas = await Pedido.destroy({ where: { id } });
        if (filasEliminadas === 0) {
        return res.status(404).json({ success: false, message: 'Pedido no encontrado' });
        }

        res.status(200).json({ success: true, message: 'Pedido eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al eliminar el pedido', error: error.message });
    }
};