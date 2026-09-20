import { Router } from 'express';
import * as usuarioController from '../controllers/usuarioController.js';
import { validarRegistro, validarActualizacion } from '../middlewares/validateUsuario.js';
// Nuevo controlador para transacciones
import { crearUsuarioYPedido } from '../controllers/transaccionController.js';

import { obtenerUsuariosORM, obtenerUsuariosSQL } from '../controllers/usuarioOrmController.js';

const router = Router();

// =================================================================
// 1. RUTAS ESPECÍFICAS / ESTÁTICAS PRIMERO (Path relativo)
// =================================================================

// Ruta requerida para (ORM) -> Acceso: GET /api/usuarios/orm
router.get('/orm', obtenerUsuariosORM);

// Ruta comparativa (SQL Tradicional) -> Acceso: GET /api/usuarios/sql
router.get('/sql', obtenerUsuariosSQL);

// Ruta de Transaccionalidad -> Acceso: POST /api/usuarios/transaccion
router.post('/transaccion', crearUsuarioYPedido);


// =================================================================
// 2. RUTAS RAÍZ Y DINÁMICAS DESPUÉS
// =================================================================

// Endpoint de consulta general y filtrado (?nombre=...) -> Acceso: GET /api/usuarios
router.get('/', usuarioController.ObtenerUsuarios);

// Endpoint de creación con validación -> Acceso: POST /api/usuarios
router.post('/', validarRegistro, usuarioController.crearUsuario);

// Endpoint de consulta individual por ID -> Acceso: GET /api/usuarios/:id
router.get('/:id', usuarioController.obtenerPorIdUsuarios);

// Endpoint de actualizar con validación -> Acceso: PUT /api/usuarios/:id
router.put('/:id', validarActualizacion, usuarioController.actualizarUsuario);

// Endpoint de eliminar -> Acceso: DELETE /api/usuarios/:id
router.delete('/:id', usuarioController.eliminarUsuario);

export default router;