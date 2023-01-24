//Creamos un método que nos ayude a proteger las rutas
module.exports = {
    isLoggedIn(req, res, next){//Métedo que nos permite saber si el usuario ha iniciado seseión o no 
        //Se necesitan los parámetros re, res, next porque este método será ejecutado en rutas de express
        if(req.isAuthenticated()){//isAuthenticated() es un método de passport que nos devuelve true en caso de que el usuario se haya logueado, que exista una sesión para él
            return next(); //En caso de existir la sesión continuar con el resto de código 
        }
        return res.redirect('signin');
    },

    isNotLoggedIn(req, res, next){
        if(!req.isAuthenticated()){
            return next();
        }
        return res.redirect('profile');
    }
};