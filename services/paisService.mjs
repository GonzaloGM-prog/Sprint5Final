import PaisRepository from '../repositories/PaisRepository.mjs';

class PaisService {

    async importarPaises() {

        const response = await fetch(
            'https://restcountries.com/v3.1/region/america'
        );

        const data = await response.json();

        const paisesEspanol = data.filter(
            pais => pais.languages?.spa
        );

        const paisesLimpios = paisesEspanol.map(pais => ({

            name:
                pais.translations?.spa?.official ||
                pais.name.official,

            capital: pais.capital?.[0],

            population: pais.population,

            area: pais.area,

            region: pais.region,

            languages: pais.languages,

            timezones: pais.timezones,

            flags: pais.flags,

            creador: 'Gonzalo Gil Miranda'

        }));

        await PaisRepository.eliminarTodosPorCreador(
            'Gonzalo Gil Miranda'
        );

        await PaisRepository.insertarMuchos(
            paisesLimpios
        );

        return paisesLimpios.length;

    }
    async crearPais(datos) {

    const nuevoPais = new Pais(datos);

    return await PaisRepository.guardar(
        nuevoPais
    );

    }
    async obtenerPaises() {

        console.log("SERVICE: obtenerPaises");
        return await PaisRepository.obtenerTodosPorCreador(
            'Gonzalo Gil Miranda'
        );

    }

    async obtenerPais(id) {

        return await PaisRepository.obtenerPorId(id);

    }

    async crearPais(datos) {

        return await PaisRepository.crear(datos);

    }

    async editarPais(id, datos) {

        return await PaisRepository.actualizarPorId(
            id,
            datos
        );

    }

    async eliminarPais(id) {

        return await PaisRepository.eliminarPorId(id);

    }

}

export default new PaisService();