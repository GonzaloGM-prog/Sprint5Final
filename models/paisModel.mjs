import mongoose from 'mongoose';

const paisSchema = new mongoose.Schema({

    name: {

        type: String,

        required: true,

        minlength: 3,

        maxlength: 90

    },

    capital: {

        type: String,

        required: true,

        minlength: 3,

        maxlength: 90

    },

    population: {

        type: Number,

        required: true,

        min: 1

    },

    area: {

        type: Number,

        required: true,

        min: 1

    },

    region: String,

    languages: Object,

    timezones: [String],

    flags: Object,

    borders: {

        type: [String],

        validate: {

            validator: function(borders) {

                return borders.every(
                    border => /^[A-Z]{3}$/.test(border)
                );
            },

            message:
            'Los borders deben tener 3 letras mayúsculas'

        }
    },

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