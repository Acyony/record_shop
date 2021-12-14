const express = require('express');
const userRouter = express.Router();
const {body, validationResult} = require('express-validator');
const auth = require('../middleware/auth');

const {getUsers, getUser, deleteUser, updateUser, addUser, userSignup, userLogin, loggedIn} = require('../controllers/userController');



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

/*Signup: Return a token every time a user is created.*/
userRouter.route("/signup").post(userSignup);

/*Login: Create new route /login and controller for user login*/
userRouter.route('/login').post( [
    body('email').notEmpty().withMessage('Email is required!').isEmail().normalizeEmail(),
    body('password', "Please, enter a valid password").notEmpty().isLength({min: 4}),
], userLogin);

userRouter.route('/me').get( auth, loggedIn)

userRouter.route('/:id').get(getUser).put(updateUser).delete(deleteUser);


module.exports = userRouter;
