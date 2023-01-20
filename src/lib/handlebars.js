//Aquí se configura el helper para que se pueda usar en cualquier parte de la aplicación

//Utilizaremos el módulo timeago.js para formatear las fechas
const {format} = require('timeago.js');//En este caso usuremos solo el método format del módulo timeago.js

const helpers = {};//Se crea un helper para poder usarlo en cualquier parte de la aplicación

//Se crea un método para el obj helper que recibe como parámetro la fecha y la formatea
helpers.timeago = (timestamp) => {
    return format(timestamp);
};

module.exports = helpers;