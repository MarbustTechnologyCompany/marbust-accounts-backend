const sendEmail = require('../../../services/sendEmail.service');

// Post Method that receives
exports.postCalculate = (req, res) => {
    const { preValue } = req.body;
    // Check if preValue is a number
    if (isNaN(preValue)) {
      return res.status(400).json({ error: 'preValue must be a number' });
    }
    const newValue = (preValue + 0.30) * 100;
    const result = newValue / 94.6;
    // Return in float format with two decimal places
    res.json({
      result: parseFloat(result.toFixed(2)),
    });
}

exports.postGenerateLink = (req, res) => {
    const { preValue, paypalMe } = req.body;
    if (isNaN(preValue)) {
      return res.status(400).json({ error: 'preValue must be a number' });
    }
    if (!paypalMe) {
      return res.status(400).json({ error: 'paypalMe is required' });
    }
    const newValue = (preValue + 0.30) * 100;
    const result = newValue / 94.6;
    res.json({
      result: parseFloat(result.toFixed(2)),
      paypalMeLink: `https://www.paypal.me/${paypalMe}/${result.toFixed(2)}`
    });
}
