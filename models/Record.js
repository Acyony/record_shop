const mongoose = require('mongoose');
const {Schema} = require("mongoose");
const RecordSchema = new mongoose.Schema({
    title: {type: String, required: true},
    artist: {type: String, required: true},
    price: {type: Number, required: true},
    genre: {type: String},
    country: {type: String},
    // orders: [{type: Schema.Types.ObjectId, ref: "Order"}]
})

module.exports = mongoose.model('Record', RecordSchema);