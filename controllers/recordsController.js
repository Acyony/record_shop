const RecordModel = require("../models/Record");


const mongoose = require('mongoose');
const Record = require('../models/Record');
const OrderModel = require('../models/Orders');
const OrderUsers = require('../models/User');
const {validationResult} = require("express-validator");


exports.getRecords = async (req, res, next) => {
    try {
        const records = await RecordModel.find();
        res.status(200).send(records);
    } catch (err) {
        err.status = 500;
        next(err);
    }
}
//
// exports.postRecord = async (req, res, next) => {
//     const record = req.body;
//     await RecordModel.get("records")
//         .push(record)
//         .last()
//         .assign({id: Date.now().toString()})
//         .write();
//
//     res.status(200).send(record);
// }


/*task 03*/
// get by id
exports.getRecordId = async (req, res, next) => {
    const {id} = req.params;
    console.log(id)
    if (Number.isNaN(id)) {
        throw new Error("error: Uh oh, something has gone wrong. Please tweet us @racyony about the issue. Thank you."
        )
    } else {
        try {
            const {id} = req.params;
            const order = await RecordModel.findOne({_id: id});
            res.status(200).send(order);
        } catch (err) {
            console.log(err)
            err.status = 500;
            next(err);
        }
    }
}


//update
exports.upDateRecord = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const {id} = req.params;
        const dt = req.body;
        const record = await RecordModel.findOneAndUpdate({_id: id}, dt);
        // return order;
        res.status(200).send(record);
    } catch (err) {
        err.status = 500;
        next(err);
    }
}


// delete using id
exports.deleteRecord = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const {id} = req.params;
        const record = await RecordModel.deleteOne({_id: id});
        res.status(200).send(record);
    } catch (err) {
        err.status = 500;
        next(err);
    }

}


exports.addRecord = async (req, res, next) => {
    const {title, artist, price, genre, country} = req.body;

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const record = await RecordModel.create({
            title,
            artist,
            price,
            genre,
            country
        });
        await record.save();
        res.status(200).send(record);
    } catch (err) {
        next(err);
    }
};

