const express = require('express');
const router = express.Router();

const pool = require('../database');
const {isLoggedIn} = require('../lib/auth');//Método que nos permite proteger las rutas

router.get('/add', isLoggedIn, (req, res) =>{
    res.render('links/add');//No es necesario poner la ruta completa porque la ruta /wiews ya está configurada en el archivo index.js 
}); 

router.post('/add', isLoggedIn, async (req, res) => {
    //No importa que ya haya una ruta con el mismo nombre, porque el método http es distinto: uno es get y el otro es post
    const newLink = req.body;//En res.body se encuentran los datos que se envían desde el formulario
    console.log(newLink);
    newLink.user_id = req.user.id;
    await pool.query('INSERT INTO link set ?', newLink);//El primer parámetro es la consulta y el segundo es el objeto que se va a insertar.
    //El método query() retorna una promesa, por lo que se debe usar await (y por consecuente async)
    req.flash('success', 'Link saved successfully');//El método flash() recibe dos parámetros: el nombre del mensaje y el mensaje en sí
    res.redirect('/links');
});

router.get('/', isLoggedIn, async (req, res) => {
    const links = await pool.query('SELECT * FROM link WHERE user_id = ?', req.user.id);
    console.log(links);
    res.render('links/list', {links});//Le estoy pasando el array links obtenido de la consulta a la vista (la vista list.hbs)
})

router.get('/delete/:id', isLoggedIn, async (req, res) => {
    const {id} = req.params; //Uso req.params porque el id es enviado por el cliente como parámetro en la url
    await pool.query('DELETE FROM link WHERE id = ?', id);
    req.flash('success', 'Link removed successfully');
    res.redirect('/links');
});

router.get('/edit/:id', isLoggedIn, async (req, res) => {
    const {id} = req.params; //Uso req.params porque el id es enviado por el cliente como parámetro en la url
    const link = await pool.query('SELECT * FROM link WHERE id = ?', id);
    //console.log(link[0]);
    res.render('links/edit', {link : link[0]});//Le estoy pasando el obj contenido en el array con el link obtenido de la consulta a la vista (la vista edit.hbs)
});

router.post('/edit/:id', isLoggedIn, async (req, res) => {
    const {id} = req.params; 
    const newLink = req.body;
    await pool.query('UPDATE link SET ? WHERE id = ?', [newLink, id]);
    req.flash('success', 'Link updated successfully');
    res.redirect('/links');//Le estoy pasando el obj contenido en el array con el link obtenido de la consulta a la vista (la vista edit.hbs)
});

module.exports = router;