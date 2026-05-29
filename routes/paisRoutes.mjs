import express from 'express';
import { body } from 'express-validator';

import {

    renderDashboard,
    renderAgregarPais,
    agregarPais,
    renderEditarPais,
    editarPais,
    eliminarPais,
    importarPaises,
    renderAcerca,
    obtenerPaises


}

from '../controllers/paisController.mjs';

const router = express.Router();

router.get('/importar', importarPaises);

router.get('/dashboard', renderDashboard);

router.get('/agregar', renderAgregarPais);

router.post(

    '/agregar',

    [

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

    ],

    agregarPais
);
router.get('/editar/:id', renderEditarPais);

router.post('/editar/:id',
    [

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

    ],
    editarPais);

router.get('/eliminar/:id', eliminarPais);

router.get('/ver', obtenerPaises);

router.get('/acerca', renderAcerca);

export default router;