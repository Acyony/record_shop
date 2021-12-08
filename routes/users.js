const express = require('express');
const userRouter = express.Router();
const {body, validationResult} = require('express-validator');

const {getUsers, getUser, deleteUser, updateUser, addUser} = require('../controllers/userController');



userRouter.route("/").get(getUsers).post([
    body('firstName').notEmpty().withMessage('first name is required!').trim(),
    body('lastName').notEmpty().withMessage('last name is required!').trim(),
    body('street').notEmpty().withMessage('Street is required!'),
    body('city').notEmpty().withMessage('City is required!'),
    body('email').notEmpty().withMessage('Email is required!').isEmail().normalizeEmail(),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({min: 4}).withMessage('Password is to short!')
        .custom((val, {req}) => {
        if(val !== req.body.password_confirm) {
            throw new Error('Password dont match! Please try again!')
        } else {
            return val;
        }
    })
    ],
    addUser);

userRouter.route('/:id').get(getUser).put(updateUser).delete(deleteUser);


module.exports = userRouter;
