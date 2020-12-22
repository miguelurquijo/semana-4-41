const { Articulo } = require('../models/');


module.exports = {

    list : async (req, res, next) => {
        try {

            const listadoArticulos = await Articulo.findAll();
            res.status(200).json(listadoArticulos);
            
        } catch (error) {
            res.status(500).json({'error' : 'Oops paso algo'});
            next(error)
        }
    },

    add : async (req, res, next) => {
        try {

            const addArticulo = await Articulo.create(req.body);
            res.status(200).json(addArticulo);
            
        } catch (error) {
            res.status(500).json({'error' : 'Oops paso algo'});
            next(error)
        }
    },

    update : async (req, res, next) => {
        try {

            const updateArticulo = await Articulo.update({ categoriaId: req.body.categoriaId, codigo: req.body.codigo, nombre: req.body.nombre, descripcion: req.body.descripcion},{ where : {id: req.body.id} });
            res.status(200).json(updateArticulo);
            
        } catch (error) {
            res.status(500).json({'error' : 'Oops paso algo'});
            next(error)
        }
    },

    activate : async (req, res, next) => {
        try {

            const activateArticulo = await Articulo.update({ estado: 1 },{ where : {id: req.body.id} });
            res.status(200).json(activateArticulo);
            
        } catch (error) {
            res.status(500).json({'error' : 'Oops paso algo'})
            next(error)
        }
    },

    deactivate : async (req, res, next) => {    
        try {

            const deactivateArticulo = await Articulo.update({ estado: 0 },{ where : {id: req.body.id} })
            res.status(200).json(deactivateArticulo)
            
        } catch (error) {
            res.status(500).json({'error' : 'Oops paso algo'})
            next(error)
        }
    }

}