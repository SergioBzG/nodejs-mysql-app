//En este archivo se pondán todos los datos que son necesarios para usar servicios, ej: puerto, clave de bd, etc.

//Desde este archivo se exporta un objeto con los datos de la bd
module.exports = {
    //Objeto de configuración de la bd
    database: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'links_db',
        // port: 3306
    }
};