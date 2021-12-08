const express = require('express');
const addressRouter = express.Router();
const {body, validationResult} = require('express-validator');

const {addAddress} = require('../controllers/addressController');

addressRouter.route('/').post([
    body('street').notEmpty().withMessage('Street is required!'),
    body('city').notEmpty().withMessage('City is requiredStreet is required!')
], addAddress);

module.exports = addressRouter;