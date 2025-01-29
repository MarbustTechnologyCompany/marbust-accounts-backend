const jwt = require('jsonwebtoken');
const config = require('../config');
const crypto = require('crypto');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        return res.status(401).json({ error: 'Not authenticated.' });
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, config.jwtSecret);
    } catch (err) {
        return res.status(500).json({ error: 'Token verification failed.' });
    }
    if (!decodedToken) {
        return res.status(401).json({ error: 'Not authenticated.' });
    }

    const userIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const publicIp = userIp.split(',')[0].trim();
    const userAgent = req.headers['user-agent'];

    const currentUniqueIdentifier = crypto.createHash('sha256').update(publicIp + userAgent).digest('hex');

    // Comparar el identificador único del token con el actual
    if (decodedToken.uniqueId !== currentUniqueIdentifier) {
        return res.status(401).json({ error: 'Invalid device.' });
    }

    req.userId = decodedToken.userId;
    req.roleId = decodedToken.roleId;
    next();
};