const express = require('express');
const router = express.Router();

// Importar subrutas
const tarjetasRoutes = require('./tarjetas.routes');
const analisisEstiloDeVidaRoutes = require('./analisisEstiloDeVida.routes');

// Usar subrutas
router.use('/tarjetas', tarjetasRoutes);
router.use(analisisEstiloDeVidaRoutes);

module.exports = router;