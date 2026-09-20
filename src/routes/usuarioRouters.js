import { Router } from 'express';
import * as usuarioController from '../controllers/usuarioController.js';
import { validarRegistro, validarActualizacion } from '../middlewares/validateUsuario.js';

const router = Router();

// Endpoint de consulta general y filtrado (?nombre=...)
router.get('/', usuarioController.ObtenerUsuarios);

// Endpoint de consulta individual por ID
router.get('/:id', usuarioController.obtenerPorIdUsuarios);

// Endpoint de creación con validación de express-validator
router.post('/', validarRegistro, usuarioController.crearUsuario);

// Endpoint de actualizar con validación
router.put('/:id', validarActualizacion, usuarioController.actualizarUsuario);

// Endpoint de eliminar
router.delete('/:id', usuarioController.eliminarUsuario);

export default router;