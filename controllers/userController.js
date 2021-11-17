const db = require("../data/db1");


const validateUserController = (req, res) => {
    res.send(req.body);
};


const sanitizeUser = (req, res) => {
    res.send(req.body);
}

module.exports = {
    validateUserController, sanitizeUser
}