const express = require('express');
const rutas = express.Router();
const HistorialModel = require('../models/historial');

//endpoint 1 traer todas los registro
rutas.get('/traerTodohistorial', async (req, res) => {
    try  {
       const registro = await  HistorialModel.find();
       res.json(registro);
    } catch (error){
        res.status(500).json({mensaje: error.message});
    }
});
//endpoint 2 crear registro
rutas.post('/crearHistorial',async (req, res)=> {
    const registro =new HistorialModel({
        fecha: req.body.fecha,
        peso: req.body.peso,
        sintomas_clinicos: req.body.sintomas_clinicos,
        diacnostico_clinico: req.body.diacnostico_clinico,
        tratamiento: req.body.tratamiento,
        proxima_consulta: req.body.proxima_consulta
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
        const registroEditado = await HistorialModel.findByIdAndUpdate(req.params.id, req.body, {new : true});
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
        const registroEliminada = await HistorialModel.findByIdAndDelete(req.params.id);
        if (!registroEliminada)
            return res.status(404).json({ mesaje : 'Registro no encontrado!'});
        else
            return res.json({mesaje : 'Registro eliminado'});
    } 
    catch (error){
        res.status(500).json({ mensaje : error.mensaje})
    }

});


module.exports = rutas;