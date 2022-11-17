const { response } = require("express");


const cargarArchivo = (req, res = response) => {

    res.json({
        msg: 'Cargando archivo...'
    })


}

module.exports = {
    cargarArchivo
}