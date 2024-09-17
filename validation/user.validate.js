const joi = require("joi");

const validation = joi.object({
    email: joi.string().email().trim(true).required(),

    firstName: joi.string().regex(/^[A-Za-z][A-Za-z]{2,15}$/).required(),

    lastName: joi.string().regex(/^[A-Za-z][A-Za-z]{2,29}$/).required(),

    userName: joi.string().trim(true).regex(/^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/).required(),

    password: joi.string().regex(/^(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,16}$/).trim(true).required(),

    countryCode: joi.string().regex(/^(\+?[0-9]\d{1,3}|\d{1,4})$/).required(),

    phone: joi.string().regex(/^(0|91)?[6-9][0-9]{9}$/).required(),

    address: joi.string().min(5).max(200).pattern(/^(?!\d+$)[a-zA-Z0-9\s,.'-]+$/).required()
});

const userValidation = async (req, res, next) => {
    const payload = {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        password: req.body.password,
        countryCode: req.body.countryCode,
        phone: req.body.phone,
        address: req.body.address
    };

    const { error } = validation.validate(payload);
    if (error) {
        res.status(406).json({
            message: error.details,
        });

    } else {
        next();
    }
};

module.exports = userValidation;