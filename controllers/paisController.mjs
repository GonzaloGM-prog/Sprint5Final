import Pais from '../models/paisModel.mjs';
import { validationResult } from 'express-validator';
export async function importarPaises(req, res) {

    try {

        const response = await fetch(
            'https://restcountries.com/v3.1/region/america'
        );

        const data = await response.json();

        // FILTRAR SOLO PAISES CON ESPAÑOL
        const paisesEspanol = data.filter(
            pais => pais.languages?.spa
        );

        // LIMPIAR DATOS
        const paisesLimpios = paisesEspanol.map(pais => ({

            name: pais.name.common,

            capital: pais.capital?.[0],

            population: pais.population,

            area: pais.area,

            region: pais.region,

            languages: pais.languages,

            timezones: pais.timezones,

            flags: pais.flags,

            creador: 'Gonzalo Gil Miranda'

        }));

        // BORRAR DATOS ANTERIORES
        await Pais.deleteMany({
            creador: 'Gonzalo Gil Miranda'
        });

        // INSERTAR NUEVOS DATOS
        await Pais.insertMany(paisesLimpios);

        res.json({
            mensaje: 'Países importados correctamente',
            cantidad: paisesLimpios.length
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: 'Error al importar países'
        });
    }
}
//ruta para ver paises
export async function obtenerPaises(req, res) {

    try {

        const paises = await Pais.find({
            creador: 'Gonzalo Gil Miranda'
        });

        res.json(paises);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: 'Error al obtener países'
        });
    }
}
//controlador del dasboard
export async function renderDashboard(req, res) {

    try {

        const paises = await Pais.find({
            creador: 'Gonzalo Gil Miranda'
        });

        res.render('dashboard', {
            paises
        });

    } catch (error) {

        console.error(error);

        res.send('Error');
    }
}
export function renderAgregarPais(req, res) {

    res.render('agregarPais', {

        errores: [],

        datos: {}

    });
}
export async function agregarPais(req, res) {

    try {

        const errores = validationResult(req);

        if (!errores.isEmpty()) {

            return res.render('agregarPais', {

                errores: errores.array(),

                datos: req.body

            });
        }

        const nuevoPais = new Pais({

            name: req.body.name,

            capital: req.body.capital,

            population: req.body.population,

            area: req.body.area,

            region: req.body.region,

            timezones: [req.body.timezones],

            creador: 'Gonzalo Gil Miranda'

        });

        await nuevoPais.save();

        res.redirect('/api/paises/dashboard');

    } catch (error) {

        console.error(error);

        res.send('Error al agregar país');
    }
}
export async function renderEditarPais(req, res) {

    try {

        const pais = await Pais.findById(req.params.id);

        res.render('editarPais', {
            pais
        });

    } catch (error) {

        console.error(error);
    }
}

export async function editarPais(req, res) {

    try {

        await Pais.findByIdAndUpdate(req.params.id, {

            name: req.body.name,

            capital: req.body.capital,

            population: req.body.population,

            area: req.body.area,

            region: req.body.region,

            timezones: [req.body.timezones]

        });

        res.redirect('/api/paises/dashboard');

    } catch (error) {

        console.error(error);
    }
}

export async function eliminarPais(req, res) {

    try {

        await Pais.findByIdAndDelete(req.params.id);

        res.redirect('/api/paises/dashboard');

    } catch (error) {

        console.error(error);
    }
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