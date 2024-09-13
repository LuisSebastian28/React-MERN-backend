

const {Router} = require('express')
const router = Router() 
const {validarJWT} = require('../middlewares/validar-jwt')
//Todas tienen que pasar por la validacion del JWT

const { getEventos, crearEventos, actualizarEvento, eliminarEvento} = require("../controllers/events")
const { check } = require('express-validator')
const { isEmpty } = require('gatsby/dist/schema/infer/inference-metadata')
const { validarCampos } = require('../middlewares/validar-campos')
const { isDate } = require('../helpers/isDate')




router.use(validarJWT)
// obtener eventos
router.get('/', getEventos )

// Crear un nuevo evento
router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalizacion es obligatoria').custom(isDate),     
        validarCampos
    ],
    crearEventos )

// Actualizar un evento
router.put(
    '/:id',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalizacion es obligatoria').custom(isDate),     
        validarCampos
    ],
    actualizarEvento )

// Eliminar un evento
router.delete('/:id', eliminarEvento )

module.exports = router;