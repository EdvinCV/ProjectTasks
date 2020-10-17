const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Get token
    const token = req.header('x-auth-token');
    // If there's no token
    if(!token){
        return res.status(400).json({
            ok: false,
            message: "There is no token"
        });
    }
    // Validate token
    try {
        const valid = jwt.verify(token, process.env.SECRET);
        req.user = valid.user;
        next();
    } catch (error) {
        return res.status(400).json({
            ok: false,
            message: "Invalid token"
        });
    }
}