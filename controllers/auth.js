
const express = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarHWT } = require('../helpers/hwt');


const crearUsuario = async (req, res = express.response) => {

    const { email, password } = req.body;

    try {

        let usuario = await Usuario.findOne({ email })

        if (usuario) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El correo ya existe',
            })
        }
        usuario = new Usuario(req.body);

        //encriptar contraseña
        const salt = bcrypt.genSaltSync();

        usuario.password = bcrypt.hashSync(password, salt);


        await usuario.save();

        //Generar JWT
        const token = await generarHWT(usuario.id, usuario.name)

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })

    }


}

const loginUsuario = async (req, res = express.response) => {
    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ email });

        // Verificar si el usuario existe
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El usuario no existe con ese email',
            });
        }

        // Confirmar passwords
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Password incorrecto',
            });
        }

        // Generar nuestro JWT (pendiente de implementar)
        const token = await generarHWT(usuario.id, usuario.name)


        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}


const revalidarToken =async (req, res = express.response) => {
    const uid = req.uid;
    const name = req.name;

    //generar un nuevo JWT y retornarlo en esta peticion
    const token = await generarHWT(uid,name)

    res.json({
        ok: true,
        uid,
        name,
        token
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}