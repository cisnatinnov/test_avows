const Joi = require('joi');

const userSchema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    age: Joi.number().integer().min(18).max(100).required(),
    bod: Joi.date().required()
});

const populationSchema = Joi.object({
    province: Joi.string().required(),
    population: Joi.number().required()
})

module.exports = {
    userSchema,
    populationSchema
};
