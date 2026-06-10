export default class IRepository {

    async obtenerTodos() {
        throw new Error('Método no implementado');
    }

    async obtenerPorId(id) {
        throw new Error('Método no implementado');
    }

    async guardar(entidad) {
        throw new Error('Método no implementado');
    }

    async actualizarPorId(id, datos) {
        throw new Error('Método no implementado');
    }

    async eliminarPorId(id) {
        throw new Error('Método no implementado');
    }

}