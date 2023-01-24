const express = require('express');
const router = express.Router();

const pool = require('../database');
const passport = require('passport');
const {isLoggedIn, isNotLoggedIn} = require('../lib/auth');//Métodos que nos permite proteger las rutas

router.get('/signup', isNotLoggedIn, (req, res) => {
    res.render('auth/signup')
});

//Hay dos formas de enrutar la autenticación :
//Primera
// router.post('/signup', async (req, res) => {
//     passport.authenticate('local.signup', {
//         successRedirect : '/profile', //En caso de autenticación exitosa
//         failureRedirect : '/signup', //En caso de autenticación fallida
//         failureFlash : true //Habilitamos los mensajes flash definidos anteriormente
//     });
//     res.send('received');
// });
//Segunda 
router.post('/signup', passport.authenticate('local.signup',{
    successRedirect : '/profile', //En caso de autenticación exitosa
    failureRedirect : '/signup', //En caso de autenticación fallida
    failureFlash : true //Habilitamos los mensajes flash definidos anteriormente
}))

router.get('/signin', isNotLoggedIn, (req, res) => {
    res.render('auth/signin');
});

router.post('/signin', (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect : '/profile',
        failureRedirect : '/signin',
        failureFlash : true
    })(req, res, next);
});

router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile');
});

router.get('/logout', isLoggedIn, (req, res) => {
    req.logOut(req.user, err => {//logOut() es un método que me ofrece passport para limpiar la sesión de un usuario
        if(err) return next(err);
        res.redirect('/signin');
    });   
});

module.exports = router;