import IRepository from './IRepository.mjs';
import Pais from '../models/paisModel.mjs';

class PaisRepository extends IRepository {
    async crear(datos) {
        return await Pais.create(datos);
    }
    async obtenerTodos() {
        return await Pais.find();
    }

    async obtenerPorId(id) {
        return await Pais.findById(id);
    }

    async guardar(pais) {
        return await pais.save();
    }

    async actualizarPorId(id, datos) {

        return await Pais.findByIdAndUpdate(
            id,
            datos,
            {
                runValidators: true,
                returnDocument: 'after'
            }
        );

    }

    async eliminarPorId(id) {
        return await Pais.findByIdAndDelete(id);
    }

    async obtenerTodosPorCreador(creador) {
        console.log(
        'Repository: obtenerTodosPorCreador'
        );
        return await Pais.find({ creador });
    }

    async eliminarTodosPorCreador(creador) {
        return await Pais.deleteMany({ creador });
    }

    async insertarMuchos(paises) {
        return await Pais.insertMany(paises);
    }

}

export default new PaisRepository();