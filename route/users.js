const express = require('express');
const {validateUserController, sanitizeUser} = require("../controllers/userController");
const middleware = require("../middleware/users");
const routerUser = express.Router();
const routerSanitize = express.Router();

routerUser.use(middleware.validateUser);
routerUser.use(middleware.validateUserAge);
routerUser.use(middleware.validateUserClass);

routerSanitize.use(middleware.sanitizeUser);

routerUser.post('/', validateUserController);
routerSanitize.post('/', sanitizeUser);

module.exports = {
    routerUser, routerSanitize
};