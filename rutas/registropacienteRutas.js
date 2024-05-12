const express = require('express');
const rutas = express.Router();
const RegistropacienteModel = require('../models/registropaciente');

//endpoint traer todas las recetas
rutas.get('/traerTodoRegistro', async (req, res) => {
    try  {
       const registro = await  RegistropacienteModel.find();
       res.json(registro);
    } catch (error){
        res.status(500).json({mensaje: error.message});
    }
});

module.exports = rutas;