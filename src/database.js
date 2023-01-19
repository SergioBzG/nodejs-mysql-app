//Archivo para crear la conexión a la base de datos
const mysql = require('mysql');
const {database} = require('./keys');
const {promisify} = require('util'); //Permite convertir funciones que reciben callbacks a funciones que retornan promesas. Es necesario usarlo porque las funciones de mysql no retornan promesas, sino que reciben callbacks

//mysql.createPool() permite crear la conexión a la bd. Este método ofrece un pool de conexiones (hilos que se ejecutan y cada uno realiza una tarea a la  vez), es decir, permite tener varias conexiones a la bd
const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    //Al obtener la conexión puedo recibir un error o la conexión (err o connection)
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('DATABASE CONNECTION WAS CLOSED');
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('DATABASE HAS TO MANY CONNECTIONS');
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('DATABASE CONNECTION WAS REFUSED');
        }
    }
    if(connection) connection.release(); //Si la conexión se obtuvo correctamente, se libera la conexión
    console.log('DB is connected');
    return;
});

pool.query = promisify(pool.query); //poolquery() es una función que recibe un query y un callback. Con promisify() se convierte en una función que recibe un query y retorna una promesa 

module.exports = pool;//Cada vez que requiera la conexión a la bd, se debe importar este archivo

