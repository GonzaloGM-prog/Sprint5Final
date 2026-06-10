import PaisService from '../services/paisService.mjs';
import { validationResult } from 'express-validator';

// IMPORTAR PAISES

export async function importarPaises(req, res) {

    try {

        const cantidad =
            await PaisService.importarPaises();

        res.json({

            mensaje: 'Países importados correctamente',

            cantidad

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            error: 'Error al importar países'

        });

    }

}

// OBTENER PAISES

export async function obtenerPaises(req, res) {

    try {

        const paises =
            await PaisService.obtenerPaises();

        res.json(paises);

    } catch (error) {

        console.error(error);

        res.status(500).json({

            error: 'Error al obtener países'

        });

    }

}

// DASHBOARD

export async function renderDashboard(req, res) {

    try {

        const paises =
            await PaisService.obtenerPaises();

        res.render('dashboard', {

            paises

        });

    } catch (error) {

        console.error(error);

        res.send('Error');

    }

}

// FORMULARIO AGREGAR

export function renderAgregarPais(req, res) {

    res.render('agregarPais', {

        errores: [],

        datos: {}

    });

}

// AGREGAR

export async function agregarPais(req, res) {

    try {

        const errores = validationResult(req);

        if (!errores.isEmpty()) {

            return res.render('agregarPais', {

                errores: errores.array(),

                datos: req.body

            });

        }

        await PaisService.crearPais({

            name: req.body.name,

            capital: req.body.capital,

            population: Number(req.body.population),

            area: Number(req.body.area),

            region: req.body.region,

            languages: {},

            timezones: [req.body.timezones],

            flags: {},

            borders: [],

            creador: 'Gonzalo Gil Miranda'

        });

        res.redirect(
            '/api/paises/dashboard'
        );

    } catch (error) {

        console.error(error);

        res.status(500).send(
            'Error al guardar país'
        );

    }

}

// FORMULARIO EDITAR

export async function renderEditarPais(req, res) {

    try {

        const pais =
            await PaisService.obtenerPais(
                req.params.id
            );

        res.render('editarPais', {

            pais,

            errores: []

        });

    } catch (error) {

        console.error(error);

        res.send('Error al cargar país');

    }

}

// EDITAR

export async function editarPais(req, res) {

    const errores = validationResult(req);

    if (!errores.isEmpty()) {

        return res.render('editarPais', {

            errores: errores.array(),

            pais: {

                _id: req.params.id,

                ...req.body

            }

        });

    }

    try {

        await PaisService.editarPais(

            req.params.id,

            {

                name: req.body.name,

                capital: req.body.capital,

                population: req.body.population,

                area: req.body.area,

                region: req.body.region,

                timezones: [req.body.timezones]

            }

        );

        res.redirect(
            '/api/paises/dashboard'
        );

    } catch (error) {

        console.error(error);

        res.send(
            'Error al editar el país'
        );

    }

}

// ELIMINAR

export async function eliminarPais(req, res) {

    try {

        await PaisService.eliminarPais(
            req.params.id
        );

        res.redirect(
            '/api/paises/dashboard'
        );

    } catch (error) {

        console.error(error);

    }

}

// ACERCA DE

export function renderAcerca(req, res) {

    res.render('acerca');

}
//va quedando de esta manera::
//importarPaises
//obtenerPaises
//renderDashboard
//----------------CRUD-----------------------
//renderAgregarPais
//agregarPais
//renderEditarPais
//editarPais
//eliminarPais
//acerca de proyecto