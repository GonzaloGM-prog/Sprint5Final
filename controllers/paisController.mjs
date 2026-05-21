import Pais from '../models/paisModel.mjs';

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