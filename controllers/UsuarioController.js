const { Usuario } = require('../models/');
const bcrypt = require('bcryptjs');
const servicioToken = require('../services/token')


module.exports = {

    list : async (req, res, next) => {
        try {

            const listadoUsuarios = await Usuario.findAll()
            res.status(200).json(listadoUsuarios)
            
        } catch (error) {
            res.status(500).json({'error' : 'Oops paso algo'})
            next(error)
        }
    },

    add : async (req, res, next) => {
        //usuario que quiero enviar
        req.body.password = bcrypt.hashSync(req.body.password, 10)
        try {
             
        // Instalamos bycript para encriptar las contraseñas en la base de datos      
            const user = await Usuario.create(req.body)
            res.status(200).json(user)
                
        } catch (error) {
            res.status(500).json({'error' : 'Oops paso algo'})
            next(error)          
        }
    },
    login : async (req, res, next) => {
        try {
            const user = await Usuario.findOne({ where : { email : req.body.email } });
            if (user) {
                //Evaluar Contraseña
                const contraseñaValida = bcrypt.compareSync(req.body.password, user.password)
                if(contraseñaValida){
                    
                    const token = servicioToken.encode(user.id, user.rol);
    
                    res.status(200).send({
                        auth: true,
                        tokenReturn : token,
                        user : user
                    })
    
                }else{
                    res.status(401).send({ auth: false, tokenReturn: null, reason:
                        "Invalid Password!" });
                        
                }
            }else{
                res.status(404).send('Usuario no existe')
            }
        } catch (error) {
            res.status(500).json({'error' : 'Oops paso algo'})
            next(error)
        }
    },

    update : async (req, res, next) => {
        try {

            const updateUsuario = await Usuario.update({nombre: req.body.nombre, estado : req.body.estado},{ where : {id: req.body.id} })
            res.status(200).json(updateUsuario);
            
        } catch (error) {
            res.status(500).json({'error' : 'Oops paso algo'});
            next(error)
        }
    },
    activate : async (req, res, next) => {
        try {

            const activateUsuario = await Usuario.update({ estado: 1 },{ where : {id: req.body.id} });
            res.status(200).json(activateUsuario);
            
        } catch (error) {
            res.status(500).json({'error' : 'Oops paso algo'})
            next(error)
        }
    },

    deactivate : async (req, res, next) => {    
        try {

            const deactivateUsuario = await Usuario.update({ estado: 0 },{ where : {id: req.body.id} })
            res.status(200).json(deactivateUsuario)
            
        } catch (error) {
            res.status(500).json({'error' : 'Oops paso algo'})
            next(error)
        }
    }
}

