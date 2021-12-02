const OrderModel = require("../models/Orders.js");
const {validationResult} = require("express-validator");


exports.getOrders = async (req, res, next) => {
    try {
        const orders = await OrderModel.find();
        res.status(200).send(orders);
    } catch (err) {
        err.status = 500;
        next(err);
    }
};

exports.getOrder = async (req, res, next) => {
    try {
        const {id} = req.params;
        const order = await OrderModel.findOne({_id: id});
        res.status(200).send(order);
    } catch (err) {
        console.log(err)
        err.status = 500;
        next(err);
    }
};

exports.deleteOrder = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const {id} = req.params;
        const order = await OrderModel.deleteOne({_id: id});
        res.status(200).send(order);
    } catch (err) {
        err.status = 500;
        next(err);
    }

};

exports.updateOrder = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const {id} = req.params;
        const dt = req.body;
        const order = await OrderModel.findOneAndUpdate({_id: id}, dt);
        res.status(200).send(order);
    } catch (err) {
        err.status = 500;
        next(err);
    }

};

exports.addOrder = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const order = await OrderModel.create({
            quantity: req.body.quantity,
            record: req.body.record,
            description: req.body.description,
        });
        await order.save();
        res.status(200).send(order);
    } catch (err) {
        next(err);
    }
};
