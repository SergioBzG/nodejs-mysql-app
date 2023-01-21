const express = require('express');
const router = express.Router();

const pool = require('../database');
const passport = require('passport');

router.get('/signup', (req, res) => {
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

router.get('/signin', (req, res) => {
    res.render('auth/signin');
});

router.post('/signin', (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect : '/profile',
        failureRedirect : '/signin',
        failureFlash : true
    })(req, res, next);
});

router.get('/profile', (req, res) => {
    res.send('Profile')
});

module.exports = router;