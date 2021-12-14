const jwt = require('jsonwebtoken');


/*Writing a middleware to get LoggedIn user.*/
module.exports = function (req, res, next) {
    const token = req.header("token");
    if (!token) {
        res.status(401).json({msg: "Authentication failed."});
    }

    try {
        const decoded = jwt.verify(token, "bonekDeCroche");
        req.user = decoded.user;
        next()
    } catch (err) {
        res.status(500).json({msg: "Invalid token."});
    }
}