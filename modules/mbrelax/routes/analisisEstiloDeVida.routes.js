const express = require('express');
const analisisEstiloDeVida = require('../controllers/analisisEstiloDeVida.controller');
const router = express.Router();


router.get('/questions/:gender', analisisEstiloDeVida.getQuestionsByGender);
router.get('/systems', analisisEstiloDeVida.getSystems);
router.post('/calculate', analisisEstiloDeVida.calculateHealthStatus);

module.exports = router;