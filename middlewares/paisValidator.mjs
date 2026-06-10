import { body } from 'express-validator';
console.log('Middleware cargado');
export const validarPais = [

    body('name')
        .isLength({ min: 3, max: 90 })
        .withMessage(
            'El nombre debe tener entre 3 y 90 caracteres'
        ),

    body('capital')
        .isLength({ min: 3, max: 90 })
        .withMessage(
            'La capital debe tener entre 3 y 90 caracteres'
        ),

    body('population')
        .isInt({ min: 1 })
        .withMessage(
            'La población debe ser positiva'
        ),

    body('area')
        .isFloat({ min: 1 })
        .withMessage(
            'El área debe ser positiva'
        )

];