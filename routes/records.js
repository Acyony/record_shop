const express = require('express');
const recordsRouter = express.Router();
const {
    getRecords,
    getRecordId,
    upDateRecord,
    deleteRecord,
    addRecord,
} = require("../controllers/recordsController");

recordsRouter.route("/").get(getRecords).post(addRecord);

//http://localhost:3000/records/:id
recordsRouter.route('/:id')
    .get(getRecordId)
    .put(upDateRecord)
    .delete(deleteRecord)

module.exports = recordsRouter;


