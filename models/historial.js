const mongoose = require('mongoose');
//definir el esquema
const historialSchema = new mongoose.Schema({
    // nombre: { type: String, require: true}

    fecha: String,
    peso: Number,
    sintomas_clinicos: String,
    diacnostico_clinico: String,
    tratamiento: String,
    proxima_consulta: String
    
});

const HistorialModel = mongoose.model('Historial',historialSchema  , 'historial');
module.exports = HistorialModel;