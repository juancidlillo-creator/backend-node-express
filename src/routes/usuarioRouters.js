import { Router } from 'express';
import * as usuarioController from '../controllers/usuarioController.js';
import { validarRegistro } from '../middlewares/validateUsuario.js';

const router = Router();

// Endpoint de consulta general y filtrado (?nombre=...)
router.get('/', usuarioController.ObtenerUsuarios);

// Endpoint de consulta individual por ID
router.get('/:id', usuarioController.obtenerPorIdUsuarios);

// Endpoint de creación con validación de express-validator
router.post('/', validarRegistro, usuarioController.crearUsuario);

export default router;