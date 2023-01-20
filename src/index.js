//Este será nuestro archivo principal
//Obtengo los modulos que necesito
const express = require('express');
const morgan = require('morgan');
const {engine} = require('express-handlebars');  
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');//Para poder usar flash se requiere almacenar en una sesión los mensajes flash, por lo que se debe usar este módulo para abrirla
const MySQLStore = require('express-mysql-session');//Este módule permite almacenar las sesiones en la bd
const {database} = require('./keys');//Importo las credenciales de la bd

//Initializations

const app = express(); //Inicializo el servidor de express

//Settings (configuraciones del server de express o la bd)

app.set('port', process.env.PORT || 4000) //Le digo que el puerto que usará el server es el 4000 o el que me indique el sistema operativo
app.set('views', path.join(__dirname, 'views'))//configuro el path de las vistas (carpeta views). __dirname es una variable global que me indica la ruta del archivo actual
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
  })); //Aquí se configuró el motor de plantillas
app.set('view engine', '.hbs'); //Hago uso del motor de plantillas

//Middlewares (funciones que se ejecutan cada vez que un cliente envía una petición al servidor)

app.use(session({
    secret : 'sbzMysqlNodeSession',
    resave : false,
    saveUninitialized : false,
    store : new MySQLStore(database)//Aquí se pasan los parámetros de la bd donde se almacenarán las sesiones
}))
app.use(flash());//Para poder usar mensajes flash(mensajes entre distintas vistas). Además, al ponerlo como middleware, se ejecuta en cada petición y podemos obtenerlo en el req
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
//urlencode permite entender los datos que envía el usuario desde un formulario
app.use(express.json());



//Global Variables

app.use((req, res, next) => {
    app.locals.success = req.flash('success');//De esta forma puedo usar el mensaje flash llamdo 'success' en cualquier vista
    next();
});

//Routes

app.use(require('./routes')) //No es necesario poner la ruta completa, ya que por defecto node busca un archivo index.js
app.use(require('./routes/authentication'))
app.use('/links',  require('./routes/links'))//Cada vez que acceda a una ruta de links, debo usar el prefijo /links

//Public

app.use(express.static(path.join(__dirname, 'public')))

//Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'))
});

