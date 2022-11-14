const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();



//Obtener todas las categorias - Público
router.get('/', (req, res) => {
    res.json('get');
})

//Obtener una categoria por id - Público
router.get('/:id', (req, res) => {
    res.json('get - id');
})

//Crear una categoria Privado - Cualquier persona con un token válido
router.post('/', (req, res) => {
    res.json('post - crear categorias');
})

//Actualizar categoria  - Privado - Cualquier persona con un token válido
router.put('/:id', (req, res) => {
    res.json('post - actualizar categorias');
})

//Eliminar categoria  - Privado . Admin, estado en FALSE
router.delete('/:id', (req, res) => {
    res.json('delete');
})


module.exports = router;