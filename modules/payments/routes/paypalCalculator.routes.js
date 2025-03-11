const express = require('express');
const paypalCalculator = require('../controllers/paypalCalculator.controller');
const router = express.Router();


router.post('/calculate', paypalCalculator.postCalculate);
router.post('/generate-link', paypalCalculator.postGenerateLink);

module.exports = router;