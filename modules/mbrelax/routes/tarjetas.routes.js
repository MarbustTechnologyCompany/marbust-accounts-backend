const express = require('express');
const tarjetasController = require('../controllers/tarjetas.controller');
const router = express.Router();


router.get('/ciudades', tarjetasController.getCiudades);
// Get all cities by province id
router.get('/ciudades/:idProvincia', tarjetasController.getCiudadesByProvincia);
// Get all the provinces
router.get('/provincias', tarjetasController.getProvincias);

module.exports = router;