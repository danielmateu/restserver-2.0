const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, obtenerCategorias, obtenerCategoria } = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db-validators');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//Obtener todas las categorias - público
router.get('/',  obtenerCategorias)

//Obtener una categoria por id - público
router.get('/:id', [
    check('id','No es un id de mongo válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos,
], obtenerCategoria)

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