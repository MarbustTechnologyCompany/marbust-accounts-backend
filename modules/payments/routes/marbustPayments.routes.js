const express = require('express');
const router = express.Router();

// Importar subrutas
const paypalCalculatorRoutes = require('./paypalCalculator.routes');

// Usar subrutas
router.use('/paypal-calculator', paypalCalculatorRoutes);

module.exports = router;