const mongoose = require('mongoose');
//definir el esquema
const RegistropacienteSchema = new mongoose.Schema({
    // nombre: { type: String, require: true}
    
    nombres_propietario: String,
    apellido_paterno: String,
    apellido_materno: String,
    telefono: Number,
    direccion: String,
    nombre_mascota: String,
    especie: String,
    edad: Number,
    raza: String,
    sexo: String,
    //usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'usuario'}
    //historial: { type: mongoose.Schema.Types.ObjectId, ref: 'historial'}
    
});

const RegistropacienteModel = mongoose.model('Registropaciente',RegistropacienteSchema  , 'registropaciente');
module.exports = RegistropacienteModel;