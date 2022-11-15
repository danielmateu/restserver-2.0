const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria } = require('../controllers/categorias');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();



//Obtener todas las categorias - público
router.get('/',  (req, res) => {
    res.json('get - Obtener categorias');
})

//Obtener una categoria por id - público
router.get('/:id', (req, res) => {
    res.json('get - id');
})

//Crear una categoria Privado - Cualquier persona con un token válido
router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos,
],  crearCategoria,
)

//Actualizar categoria - Privado - Cualquier persona con un token válido
router.put('/:id', (req, res) => {
    res.json('post - actualizar categorias');
})

//Eliminar categoria  - Privado . Admin, estado en FALSE
router.delete('/:id', (req, res) => {
    res.json('put - modificar estado, eliminar categoria');
})


module.exports = router;