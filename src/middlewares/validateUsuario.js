import { body, validationResult } from 'express-validator';

export const validarRegistro = [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    
    body('email').isEmail().withMessage('El email no es válido'),
    
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    
    (req, res, next) => {
        const errores = validationResult(req);
        
        if (!errores.isEmpty()) {
        return res.status(400).json({ errors: errores.array() });
        }
        next();
    }
];

export const validarActualizacion = [
    body('nombre').optional().notEmpty().withMessage('El nombre no puede estar vacío'),

    body('email').optional().isEmail().withMessage('El email no es válido'),

    (req, res, next) => {
        const errores = validationResult(req);

        if (!errores.isEmpty()) {
        return res.status(400).json({ errors: errores.array() });
        }

        if (req.body.nombre === undefined && req.body.email === undefined) {
        return res.status(400).json({ mensaje: 'Debe enviar nombre o email para actualizar' });
        }

        next();
    }
];