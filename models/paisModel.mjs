import mongoose from 'mongoose';

const paisSchema = new mongoose.Schema({
    name: String,
    capital: String,
    population: Number,
    area: Number,
    region: String,
    languages: Object,
    flags: Object,

    creador: {
        type: String,
        default: 'Gonzalo Gil Miranda'
    }
});

const Pais = mongoose.model(
    'Pais',
    paisSchema,
    'Grupo-08'
);

export default Pais;