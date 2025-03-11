const express = require('express');
const router = express.Router();

// Importar subrutas
const maintenanceRoutes = require('./maintenance.routes');

// Usar subrutas
router.use('/maintenance', maintenanceRoutes);

module.exports = router;