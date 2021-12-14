const UserModel = require('../models/User');
const AddressModel = require('../models/address')
const {validationResult} = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {token} = require("morgan");

exports.getUsers = async (req, res, next) => {
    try {
        const users = await UserModel.find();
        if (!user) throw new createError.NotFound();
        res.status(200).send(users)
    } catch (err) {
        console.log(err)
        err.status = 500;
        next(err);
    }
}


exports.getUser = async (req, res, next) => {
    try {
        const users = await UserModel.find();
        const {id} = req.params;
        if (!user) throw new createError.NotFound();
        res.status(200).send(users).findOne({_id: id});
    } catch (err) {
        console.log(err)
        err.status = 500;
        next(err);
    }
}


exports.deleteUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const {id} = req.params;
        const user = await UserModel.deleteOne({_id: id});
        if (!user) throw new createError.NotFound();
        res.status(200).send(user);
    } catch (err) {
        console.log(err)
        err.status = 500;
        next(err);
    }
}

exports.updateUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const {id} = req.params;
        const dt = req.body;
        const user = await UserModel.findOneAndUpdate({_id: id}, dt);
        if (!user) throw new createError.NotFound();
        res.status(200).send(user);
    } catch (err) {
        console.log(err)
        err.status = 500;
        next(err);
    }
}

exports.addUser = async (req, res, next) => {
    const {firstName, street, city, lastName, email, password} = req.body;
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const address = await AddressModel.create({
            street,
            city
        })

        const user = await UserModel.create({
            firstName,
            lastName,
            email,
            password: await encryptPassword(password),
            address: address._id
        });

        await user.save();
        res.status(200).send(user);
    } catch (err) {
        console.log(err)
        err.status = 500;
        next(err);
    }
}

/*Signup: Return a token every time a user is created.*/
exports.userSignup = async (req, res) => {
    /*validationResult*/
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
        return;
    }

    /*get user inputs - req.body*/
    const {
        firstName,
        street,
        city,
        lastName,
        email,
        password
    } = req.body;

    try {
        /*check if the user already exists*/
        let existing = await UserModel.findOne({email});

        if (existing) {
            res.status(400).json({msg: "User already exists"});
            return;
        }

    } catch (err) {
        res.status(500).send("Error in saving: " + err.message);
        return;
    }

    /*create a new user, if it doesn't already exist'*/
    const newUser = new UserModel({
        firstName,
        street,
        city,
        lastName,
        email,
        password: await encryptPassword(password),

    });
    newUser.save();

    /* sending JWT and res token to the FE*/
    const payload = {
        newUser: {
            id: newUser.id,
            name: newUser.firstName
        }
    }

    jwt.sign(payload, "bonekDeCroche", {expiresIn: "2h"}, (err, token) => {
        if (err) throw err;
        res.status(200).json({token: token});
    })
}


/*Login: Create new route /login and controller for user login*/
exports.userLogin = async (req, res) => {
    /*validation result*/
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
        return;
    }

    const {email, password} = req.body; /*frontend*/

    try {
        let user = await UserModel.findOne({email});
        if (!user) {
            res.status(400).json({msg: "User not found"})
        }

        const isMatch = await bcrypt.compare(password, user.password);/*backend hashed password*/

        if (!isMatch) {
            res.status(400).json({msg: "Incorrect password"})
        }

        /*If true create a token for the user*/
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, "bonekDeCroche", {expiresIn: "2h"}, (err, token) => {
            if (err) throw err;
            res.status(200).json({token})
        })

    } catch (err) {
        res.status(500).send("Error in saving: " + err.message)
    }
}

exports.loggedIn = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.user.id);

        /*return the user password - not a safe mode*/
        // res.json(user);

        /*return only the firstName and email*/
        res.status(200).send({message: user.firstName, email: user.email});
    } catch (err) {
        res.json({mas: "Error in logging in"})
    }
}

const encryptPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                reject(err);
            } else {
                resolve(hash);
            }
        })
    })
}