const recordsFunctions = require('../controllers/recordsController')
const express = require('express');
const recordsRouter = express.Router();


recordsRouter.route('/')
    .get(recordsFunctions.getRecord)
    .post(recordsFunctions.postRecord)


module.exports = recordsRouter;