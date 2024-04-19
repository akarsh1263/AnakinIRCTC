const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET

exports.jwtAuth = async (req, res, next) => {
    const bearerHeader = req.header('Authorization');
    try {
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        req.username = decoded.username;
        next();
    }
    catch (error) {
        res.status(401).json({ status: 'error', error: error })
    }
};