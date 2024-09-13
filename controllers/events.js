const express = require('express');
const Evento = require('../models/Evento');


const getEventos = async (req, res = express.response) => {

    const eventos = await Evento.find()
                                .populate('user', 'name')

    res.json ({
        ok: true,
        eventos
    })
}

const crearEventos = async(req, res = express.response) => {

    const evento = new Evento(req.body);

    try {
        evento.user = req.uid
        const eventoGuardado = await evento.save()
        res.json({
            ok: true,
            evento: eventoGuardado,
        })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const actualizarEvento = async (req, res = express.response) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        const evento = await Evento.findById(eventoId)

        if(!evento){
         res.status(404).json({
                ok: false,
                msg: 'Evento no encontrado con ese id'
            })
        }

        if( evento.user.toString() != uid){
            return res.status(401).json({
                ok: false,
                msg: 'No tienes permiso para editar este evento'
            })
        }

        const nuevoEvento ={
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, {new:true});

        res.json({
            ok: true,
            evento: eventoActualizado
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const eliminarEvento = async(req, res = express.response) => {
    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        const evento = await Evento.findById(eventoId)

        if(!evento){
         res.status(404).json({
                ok: false,
                msg: 'Evento no encontrado con ese id'
            })
        }

        if( evento.user.toString() != uid){
            return res.status(401).json({
                ok: false,
                msg: 'No tienes permiso para eliminar este evento'
            })
        }


       await Evento.findByIdAndDelete(eventoId);

        res.json({
            ok: true,
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

    
}




module.exports = {
    getEventos,
    crearEventos,
    actualizarEvento,
    eliminarEvento
}