const Joi = require("joi");

module.exports.registerSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30).required(),
    phone: Joi.string().min(10).max(15).required(),
    });

module.exports.loginSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).max(30).required(),
    });