const Joi = require('@hapi/joi')

const signupSchema = Joi.object({
    Fname: Joi.string().min(2).max(26).required(),
    Sname: Joi.string().min(2).max(26).required(),
    Email: Joi.string().min(2).max(42).required(),
    Username: Joi.string().min(2).max(28).required(),
    Password: Joi.string().min(6).max(36).required(),
    IsAdmin: Joi.bool().required()
})

const signinSchema = Joi.object({
    Username: Joi.string().min(2).max(28).required(),
    Password: Joi.string().min(6).max(36).required(),
})

module.exports = {signinSchema, signupSchema}