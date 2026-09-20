import { Router } from 'express';
import * as pedidoController from '../controllers/pedidoController.js';
import { validarCreacionPedido, validarActualizacionPedido } from '../middlewares/validatePedido.js';

const router = Router();

router.get('/', pedidoController.obtenerPedidos);
router.post('/', validarCreacionPedido, pedidoController.crearPedido);
router.get('/:id', pedidoController.obtenerPedidoPorId);
router.put('/:id', validarActualizacionPedido, pedidoController.actualizarPedido);
router.delete('/:id', pedidoController.eliminarPedido);

export default router;