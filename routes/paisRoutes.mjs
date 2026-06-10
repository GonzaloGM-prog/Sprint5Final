import express from 'express';

import { validarPais } from '../middlewares/paisValidator.mjs';

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

} from '../controllers/paisController.mjs';

const router = express.Router();

router.get('/importar', importarPaises);

router.get('/dashboard', renderDashboard);

router.get('/agregar', renderAgregarPais);

router.post(
    '/agregar',
    validarPais,
    agregarPais
);

router.get(
    '/editar/:id',
    renderEditarPais
);

router.post(
    '/editar/:id',
    validarPais,
    editarPais
);

router.get(
    '/eliminar/:id',
    eliminarPais
);

router.get(
    '/ver',
    obtenerPaises
);

router.get(
    '/acerca',
    renderAcerca
);

export default router;