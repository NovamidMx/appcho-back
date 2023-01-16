const { Schema, model } = require('mongoose');

const EventoSchema = Schema({

    title: {
        type: String,
        required: true
    },
    notes: {
        type: String,        
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }

});

EventoSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

// EventoSchema.statics.findAllData = function () {
//     const data = this.find({});
//     return data;
// };

// EventoSchema.statics.findOneData = function (id) {
//     const data = this.findOneData({id});
//     return data;
// };


module.exports = model('Evento', EventoSchema );

