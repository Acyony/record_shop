const mongoose = require('mongoose');
const {Schema} = require("mongoose");
const RecordSchema = new mongoose.Schema({
    title: {type: String, required: true},
    artist: {type: String, required: true},
    price: {type: Number, required: true},
    genre: {type: String},
    country: {type: String},

})

module.exports = mongoose.model('Record', RecordSchema);