function validateUser(req, res, next) {
    if (req.body.hasOwnProperty('firstName') &&
        req.body.hasOwnProperty('lastName') &&
        req.body.hasOwnProperty('age') &&
        req.body.hasOwnProperty('fbw') &&
        req.body.hasOwnProperty('email')
    ) {
        res.status(200).send({message: "This user is valid!"});
    } else {
        next();
    }

}

function validateUserAge(req, res, next) {
    if (parseInt(req.body.getProperty('age')) < 18) {
        res.status(200).send({
            message: "We can not validate your user. They are  below 18 years of age",
        });
    } else {
        next();
    }
}

function validateUserClass(req, res, next) {
    if (parseInt(req.body.getProperty('fbw')) !== 36) {
        res.status(200).send({"message": "We can not validate your user. They are not a member of FBW36"});
    } else {
        next();
    }
}


function sanitizeUser(req, res, next) {
    req.body.firstName = req.body.firstName.charAt(0).toUpperCase() + req.body.firstName.slice(1);
    req.body.lastName = req.body.lastName.charAt(0).toUpperCase() + req.body.lastName.slice(1);
    req.body.favoriteBands.sort();
    req.body.age = parseInt(req.body.age);
    req.body.fbw = parseInt(req.body.fbw);
    next();
}



module.exports = {
    validateUser, validateUserAge, validateUserClass, sanitizeUser
}