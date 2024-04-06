const jwt = require("jsonwebtoken");

const verifyToken = (req,res,next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader;
        if (token === process.env.token) {
            next();
        } else {
            return res.status(401).json("You are not authorized!");
        }
    } else {
        return res.status(401).json("You are not authorized!");
    }
};

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("You are not allowed!");
        }
    });
};


module.exports = { 
    verifyToken, 
    verifyTokenAndAuthorization
 };