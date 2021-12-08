const AddressModel = require('../models/address');
const {validationResult} = require("express-validator");

exports.addAddress = async (req, res, next) => {
    const {street, city} = req.body;

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const address = await AddressModel.create({
            street,
            city
        });
        await address.save();
        res.status(200).send(address);
    } catch (err) {
        console.log(err)
        err.status = 500;
        next(err);
    }
}
