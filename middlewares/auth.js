const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');

const isAuthenticated = async (req, res, next) => {
    // get the toke from the cookies
    const token = req.cookies && req.cookies.token;

    // if no token, return 401
    if (!token) {
        return res.status(401).json({ message: 'user not authenticated' });
    }

    try {
        // verify the token
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;

        // call the next middleware
        next();
    } catch (error) {
        res.status(401).json({ message: 'invalid token' });
    }
}

module.exports = {
    isAuthenticated
};