const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema({
    quantity: {
        type: Number,
        required: true,
    },
    record: [{type: Schema.Types.ObjectId, ref: "Record", required: true}],
    description: {
        type: String,
        required: true,
    }
});
module.exports = mongoose.model("Order", OrderSchema);