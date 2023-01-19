const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/add', (req, res) =>{
    res.render('../views/links/add');
}); 

router.post('/add', (req, res) => {
    //No importa que ya haya una ruta con el mismo nombre, porque el método http es distinto: uno es get y el otro es post
    res.send('Recieved');
});

module.exports = router;