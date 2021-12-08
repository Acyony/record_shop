const express = require('express');
const recordsRouter = express.Router();
const {
    getRecords,
    getRecordId,
    upDateRecord,
    deleteRecord,
    addRecord,
    addOrderToRecord
} = require("../controllers/recordsController");

recordsRouter.route("/").get(getRecords).post(addRecord);

//http://localhost:3000/records/:id
recordsRouter.route('/:rid')
    .get(getRecordId)
    .put(upDateRecord)
    .delete(deleteRecord)

recordsRouter.route('/:rid/:oid').post(addOrderToRecord)


module.exports = recordsRouter;


