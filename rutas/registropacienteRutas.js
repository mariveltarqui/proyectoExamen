const express = require('express');
const rutas = express.Router();
const RegistropacienteModel = require('../models/registropaciente');

//endpoint 1 traer todas los registro
rutas.get('/traerTodoRegistro', async (req, res) => {
    try  {
       const registro = await  RegistropacienteModel.find();
       res.json(registro);
    } catch (error){
        res.status(500).json({mensaje: error.message});
    }
});
//endpoint 2 crear registro
rutas.post('/crearRegistro',async (req, res)=> {
    const registro =new RegistropacienteModel({
        nombres_propietario: req.body.nombres_propietario,
        apellido_paterno: req.body.apellido_paterno,
        apellido_materno: req.body.apellido_materno,
        telefono: req.body.telefono,
        direccion: req.body.direccion,
        nombre_mascota: req.body.nombre_mascota,
        especie: req.body.especie,
        edad: req.body.edad,
        raza: req.body.raza,
        sexo: req.body.sexo
    })
    
    try {
        const nuevaRegistro = await registro.save();
        res.status(201).json(nuevaRegistro);
    }catch (error) {
        res.status(400).json({mensaje: error.message})
    }
    
    });

    //endpoint 3 editar registro
rutas.put('/editarRegistro/:id', async (req, res) => {
    try {
        const registroEditado = await RegistropacienteModel.findByIdAndUpdate(req.params.id, req.body, {new : true});
        if (!registroEditado)
            return res.status(404).json({ mesaje : 'Registro no encontrado!'});
        else
            return res.status(201).json(registroEditado);
    } catch (error){
        res.status(400).json({ mensaje : error.mensaje})
    }
});

//endpoint 4 eliminar registro
rutas.delete('/eliminarRegistro/:id', async (req, res) =>{
    try {
        const registroEliminada = await RegistropacienteModel.findByIdAndDelete(req.params.id);
        if (!registroEliminada)
            return res.status(404).json({ mesaje : 'Registro no encontrado!'});
        else
            return res.json({mesaje : 'Registro eliminado'});
    } 
    catch (error){
        res.status(500).json({ mensaje : error.mensaje})
    }

})



module.exports = rutas;