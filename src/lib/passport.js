//Aquí definimos nuestros métodos de autenticación

const passport = require('passport');//Passport es un middleware de autenticación para Node.js, que nos permite autenticar usuarios de diferentes formas haciendo uso de redes sociales.
const pool = require('../database');
const helpers = require('../lib/helpers');//Importo el módulo que cree para con los métodos para cifrar la contraseña y validarla
const LocalStrategy = require('passport-local').Strategy;//passport-local es un módulo de Passport que nos permite autenticar usuarios de manera local haciendo uso de nuestra base de datos (con un usuario y contraseña).

//Método de autenticación para el inicio de sesion
passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',//nombre del campo en el formulario
    passwordField: 'password',//nombre del campo en el formulario
    passReqToCallback: true //Este callback nos permite recibir el obj req como parámetro para la función que se encuentra dentro de LocalStrategy y que es ejecutada
}, async (req, username, password, done) => {//done es otro callback que permite continuar con el resto de código de nuestra app
    const rows = await pool.query('SELECT * FROM user WHERE username = ?', username);
    if(rows.length > 0){
        user = rows[0];
        const validPassword = await helpers.matchPassword(password, user.password);//matchPassword() retorna un booleano (true si la contraseña coincide, false en el caso contrario)
        if(validPassword){
            return done(null, user, req.flash('success','Welcome' + user.username));
        } else {
            return done(null, false, req.flash('message','Incorrect password'));
        }
    } else {
        return done(null, false, req.flash('message','Username does not exists'));
    }
}));

//Método de autenticación para el registro 
passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',//nombre del campo en el formulario
    passwordField: 'password',//nombre del campo en el formulario
    passReqToCallback: true //Este callback nos permite recibir el obj req como parámetro para la función que se encuentra dentro de LocalStrategy y que es ejecutada
}, async (req, username, password, done) => { //done es otro callback que permite continuar con el resto de código de nuestra app
    const newUser = req.body;
    newUser.password = await helpers.encryptPassword(password);//Se guarda su contraseña cifrada
    const result = await pool.query('INSERT INTO user SET ?', newUser);
    // console.log(newUser);
    newUser.id = result.insertId;
    return done(null, newUser);//Se retorna el newUser para que lo almacene en una sesion. El null se retorna en caso de error
}));

//Desde la documentación de passport nos dicen que debemos definir dos procesos: uno para serializar el usuario y otro para deserializarlo
passport.serializeUser((user, done) =>{//Aquí se toma el usuario que se está autenticando y lo guarda en una sesión.
//Cuando serializo estoy guardando el id del usuario
    done(null, user.id);
});

//Cuando deserializo estoy usundo ese id que he almacenado para volver a obtener los datos del usuario
passport.deserializeUser(async (id, done) => {
    const row = await pool.query('SELECT * FROM user WHERE id = ?', id);
    done(null, row[0]);
});