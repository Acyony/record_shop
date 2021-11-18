const recordsFunctions = require('../controllers/recordsController')
const express = require('express');
const recordsRouter = express.Router();


recordsRouter.route("/").get(recordsFunctions.getRecords);

recordsRouter.route('/')
    .post(recordsFunctions.postRecord)

//http://localhost:3000/records/:id
recordsRouter.route('/:id')
    .get(recordsFunctions.getRecordId)
    .put(recordsFunctions.upDateRecord)
    .delete(recordsFunctions.deleteRecord)

module.exports = recordsRouter;