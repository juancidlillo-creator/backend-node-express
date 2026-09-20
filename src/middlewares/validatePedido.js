import { body, validationResult } from 'express-validator';

// Middleware genérico para manejar el resultado de las validaciones
const manejarErroresValidacion = (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errores.array()
        });
    }
    next();
};

// Validación para la creación de un pedido (POST)
export const validarCreacionPedido = [
    body('descripcion')
        .notEmpty().withMessage('La descripción es obligatoria')
        .isString().withMessage('La descripción debe ser un texto'),

    body('monto')
        .notEmpty().withMessage('El monto es obligatorio')
        .isFloat({ min: 1 }).withMessage('El monto debe ser un número mayor o igual a 1'),

    body('usuarioId')
        .notEmpty().withMessage('El usuarioId es obligatorio')
        .isInt({ min: 1 }).withMessage('El usuarioId debe ser un número entero válido'),

    body('estado')
        .optional()
        .isIn(['pendiente', 'completado', 'cancelado'])
        .withMessage('El estado debe ser: pendiente, completado o cancelado'),

    manejarErroresValidacion
];

// Validación para la actualización de un pedido (PUT)
export const validarActualizacionPedido = [
    body('descripcion')
        .optional()
        .notEmpty().withMessage('La descripción no puede estar vacía')
        .isString().withMessage('La descripción debe ser un texto'),

    body('monto')
        .optional()
        .isFloat({ min: 1 }).withMessage('El monto debe ser un número mayor o igual a 1'),

    body('estado')
        .optional()
        .isIn(['pendiente', 'completado', 'cancelado'])
        .withMessage('El estado debe ser: pendiente, completado o cancelado'),

    (req, res, next) => {
        const { descripcion, monto, estado } = req.body;
        if (descripcion === undefined && monto === undefined && estado === undefined) {
            return res.status(400).json({
                success: false,
                message: 'Debe enviar al menos un campo (descripcion, monto o estado) para actualizar'
            });
        }
        next();
    },

    manejarErroresValidacion
];