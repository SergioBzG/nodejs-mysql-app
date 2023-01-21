const bcrypt = require('bcryptjs');//Módulo para cifrar contraseñas

const helpers = {};

//Se crea un método al obj helpers que toma una contraseña en texto plano y la cifra. Este método será utilizado cuando el usuario se registre
helpers.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);//genSalt() nos genera un hash tantas veces como indiquemos en el argumento, es decir, nos retorna un patrón que utilizaremos para el cifrado. Esta función es asíncrona
    const hash =  await bcrypt.hash(password, salt);
    return hash;
};

//Se crea un método para verificar que la contreseña ingresada por el usuario corresponde a la guardada en la bd. Este método será utilizado para el LogIn
helpers.matchPassword = async (password, savedPassword) => {
   try {
    await bcrypt.compare(password, savedPassword);
   } catch (error) {
    console.log(error);
   } 
};

module.exports = helpers;