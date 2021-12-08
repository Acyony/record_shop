const {Schema, model} = require('mongoose');

const addressSchema = new Schema({
    street: {type: 'string', required: true},
    city: {type: 'string', required: true}
})

module.exports = model('Address', addressSchema)