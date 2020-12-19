const { Categoria } = require('../models/');


module.exports = {

    list : async (req, res, next) => {
        try {

            const listadoCategorias = await Categoria.findAll()
            res.status(200).json({listadoCategorias});
            
        } catch (error) {
            res.status(500).json({'error' : 'Oops paso algo'});
            next(error)
        }
    },

    add : async (req, res, next) => {
        try {

            const addCategoria = await Categoria.create( req.body )
            res.status(200).json({addCategoria});
            
        } catch (error) {
            res.status(500).json({'error' : 'Oops paso algo'});
            next(error)
        }
    },

    update : async (req, res, next) => {
        try {

            const updateCategoria = await Categoria.update({nombre: req.body.nombre, descripcion: req.body.descripcion},{ where : {id: req.body.id} })
            res.status(200).json(updateCategoria);
            
        } catch (error) {
            res.status(500).json({'error' : 'Oops paso algo'});
            next(error)
        }
    },

    activate : async (req, res, next) => {
        try {

            const activateCategoria = await Categoria.update({ estado: 1 },{ where : {id: req.body.id} });
            res.status(200).json(activateCategoria);
            
        } catch (error) {
            res.status(500).json({'error' : 'Oops paso algo'})
            next(error)
        }
    },

    deactivate : async (req, res, next) => {    
        try {

            const deactivateCategoria = await Categoria.update({ estado: 0 },{ where : {id: req.body.id} });
            res.status(200).json(deactivateCategoria);
            
        } catch (error) {
            res.status(500).json({'error' : 'Oops paso algo'})
            next(error)
        }
    }

}