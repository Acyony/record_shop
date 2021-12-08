const mongoose = require("mongoose");
const {Schema} = mongoose;
const bcrypt = require('bcrypt');
const {hash} = require("bcrypt");


const UserSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        address: {
            type:  Schema.Types.ObjectId, ref:'Address'
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        toObject: {
            virtuals: true,
        },
        toJSON: {
            virtuals: true,
        },
    },
);





module.exports = mongoose.model("User", UserSchema);