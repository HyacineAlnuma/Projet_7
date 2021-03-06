const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'TOKEN');
        const userId = decodedToken.userId;
        req.auth = { userId };
        if (req.body.userId && req.body.userId !== userId) {
            throw 'UserID non valable';
        } else {
            next();
        } 
    } catch (error) {
        res.status(403).json({ error: error | 'requête non authentifiée' });
    }
}