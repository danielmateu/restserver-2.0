const path = require('path');
const fs = require('fs');
const { response } = require("express");
const { subirArchivo } = require("../helpers");
const { validarArchivoSubir } = require("../middlewares");
const { Usuario, Producto } = require("../models");


const cargarArchivo = async (req, res = response) => {


    try {
        //txt, md
        // const nombre = await subirArchivo(req.files, ['txt', 'md'], 'textos' );
        const nombre = await subirArchivo(req.files, undefined, 'imgs');
        res.json({ nombre })

    } catch (msg) {
        res.status(400).json({ msg })
    }

}

const actualizarImagen = async (req, res = response) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {

        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({ msg: `No existe ningún usuario con el id ${id}` })
            }
            break;

        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({ msg: `No existe ningún producto con el id ${id}` })
            }
            break;

        default:
            return res.status(500).json({ msg: 'Se me olvidó validar esto 🙃' })
    }

    //Limpiar imagenes previas
    try {
        if (modelo.img) {
            // Hay que borrar la img del servidor
            const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
            if (fs.existsSync(pathImagen)) {
                fs.unlinkSync(pathImagen);
            }
        }
    } catch (error) {

    }

    const nombre = await subirArchivo(req.files, undefined, coleccion);

    modelo.img = nombre;

    await modelo.save()

    res.json({
        modelo
    })
}

const mostrarImagen = async (req, res = response) => {

    const { id, coleccion } = req.params

    let modelo;

    switch (coleccion) {

        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe ningún usuario con el id ${id}`
                })
            }
            break;

        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe ningún producto con el id ${id}`
                })
            }
            break;

        default:
            return res.status(500).json({ msg: 'Se me olvidó validar esto 🙃' })
    }

    //Limpiar imagenes previas
    try {
        if (modelo.img) {
            // Hay que borrar la img del servidor
            const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
            if (fs.existsSync(pathImagen)) {
                return res.sendFile(pathImagen)
            }
        }

        const pathImagen = path.join(__dirname, '../assets/no-image.jpg');
        res.sendFile(pathImagen);

    } catch (error) {
        /* Returning a 500 error. */
        
        
    }




}

module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen,
}