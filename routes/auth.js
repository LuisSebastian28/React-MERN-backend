/*
    Ruteas de Usuarios / Auth
    host + /api/auth
*/

const {Router} = require('express');
const { crearUsuario, revalidarToken, loginUsuario } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router()

router.post(
    '/new', 
    [//middlewares
        check('name', 'El nombre el obligatorio').not().isEmpty(),
        check('email', 'El email el obligatorio').isEmail(),
        check('password', 'El password debe ser de 6 caracteres').isLength({min:6}),
        validarCampos
    ], 
    crearUsuario 
);


router.post(
    '/', 
    [
        check('email', 'El email el obligatorio').isEmail(),
        check('password', 'El password debe ser de 6 caracteres').isLength({min:6}),
        validarCampos
    ],
    loginUsuario
);



router.get('/renew', validarJWT ,revalidarToken);


module.exports = router;
