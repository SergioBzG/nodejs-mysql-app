//En este archivo se almacenarán las rutas de la aplicación
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World');
})

module.exports = router;

