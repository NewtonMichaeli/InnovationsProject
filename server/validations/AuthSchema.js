const Joi = require('@hapi/joi')
const { AllowedRegions } = require('../validations/Regions')


// Signup schema
const Joi_SignupSchema = Joi.object({
    Fname: Joi.string().min(2).max(26).required(),
    Sname: Joi.string().min(2).max(26).required(),
    Email: Joi.string().min(2).max(42).required(),
    Username: Joi.string().min(2).max(28).required(),
    Password: Joi.string().min(6).max(36).required(),
    Region: Joi.string().valid(...AllowedRegions).required()
})

// Signin schema
const Joi_SigninSchema = Joi.object({
    Username: Joi.string().min(2).max(28).required(),
    Password: Joi.string().min(6).max(36).required()
})

// <Updating> User schema - all fields are optional
const Joi_UpdatingUserDataSchema = Joi.object({
    Fname: Joi.string().min(2).max(26).optional(),
    Sname: Joi.string().min(2).max(26).optional(),
    Email: Joi.string().min(2).max(42).optional(),
    Username: Joi.string().min(2).max(28).optional(),
    Region: Joi.string().valid(...AllowedRegions).optional()
})

module.exports = {Joi_SigninSchema, Joi_SignupSchema, Joi_UpdatingUserDataSchema}