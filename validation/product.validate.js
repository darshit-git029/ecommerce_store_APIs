const joi = require("joi");
joi.image = require("joi-image-extension");

const validation = joi.object({
    title: joi.string().trim(true).required(),
    price: joi.string().regex(/^[0-9]{1,9}$/).required(),
    description: joi.string().min(5).max(250).required(),
});

const productValidation = async (req, res, next) => {
    const payload = {
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
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

module.exports = productValidation;