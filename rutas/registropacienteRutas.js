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
        sexo: req.body.sexo,
        //usuario: req.usuario._id 
        ///historial: req.historial._id
    });
    
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

});
// endpoint 5. BUSQUEDAS1: obtener el dato de la mascota de 5 años segun la especie
rutas.get('/registroBusqueda/:especie', async (req, res) => {
    try {
      //const registroBusqueda = await RegistropacienteModel.find({ especie: req.params.especie, edad: {$gte: 1, $lte: 5 }});     
      const registroBusqueda = await RegistropacienteModel.find({ especie: req.params.especie, edad: {$eq: 5}});
      if(!registroBusqueda)
            return res.status(404).json({ mensaje : 'Registro no encontrado!'});
        else 
            return res.json(registroBusqueda);
    } catch(error) {
        res.status(500).json({ mensaje : error.message})
    }
});
// endpoint 6. BUSQUEDAS2: obtener el primer dato de la mascota segun la especie
rutas.get('/registrosBusqueda/:especie', async (req, res) => {
    try {
      const registrosBusqueda =  await RegistropacienteModel.findOne({ especie: req.params.especie });
       
        if (!registrosBusqueda)
            return res.status(404).json({ mensaje : 'Registro no encontrado!'});
        else 
            return res.json(registrosBusqueda);
    } catch(error) {
        res.status(500).json({ mensaje : error.message})
    }
});

//  endpoint7- obtener registro ordenado por nombre y edad de la mascota en forma ascendente
rutas.get('/ordenarRegistro', async (req, res) => {
    try {
       const registroOrdenado = await RegistropacienteModel.find().sort({ nombre_mascota: 1, edad: 1});
       res.status(200).json(registroOrdenado);
    } catch(error) {
        res.status(500).json({ mensaje :  error.message})
    }
});

//  endpoint8- obtener registro ordenado de la edad de todos los de la especie= canino
rutas.get('/ordenarRegistros', async (req, res) => {
    try {
        const registrosOrdenado = await RegistropacienteModel.find({especie:/^c/}).sort({edad:1});
       res.status(200).json(registrosOrdenado);
    } catch(error) {
        res.status(500).json({ mensaje :  error.message})
    }
});

// endpoint9  - contar todos lo propietarios de apellido materno
rutas.get('/contarRegistro', async (req, res) => {
    try {
        const valoMaximoEdad1 = await RegistropacienteModel.countDocuments({apellido_materno: 'Perez'});
        return res.json(valoMaximoEdad1);
    } catch(error) {
        res.status(500).json({ mensaje :  error.message})
    }
});

///// endpoint10  - contar todos las mascotas que sean "hembra"
rutas.get('/encontrarRegistro', async (req, res) => {
    try {
        const encontrarRegistroH = await RegistropacienteModel.where('sexo', /^h/i);
        return res.json(encontrarRegistroH);
    } catch(error) {
        res.status(500).json({ mensaje :  error.message})
    }
});


module.exports = rutas;