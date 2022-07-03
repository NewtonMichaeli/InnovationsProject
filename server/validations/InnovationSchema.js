const Joi = require('@hapi/joi')
const Joi_AssetSchema = require('./AssetSchema')
const Joi_ContributorSchema = require('./ContributorSchema')

const Joi_InnovationSchema = Joi.object().valid({
    Name: Joi.string().required(),
    Description: Joi.string().required(),
    Tags: Joi.array().items(Joi.string()).required(),
    Roles: Joi.array().items(Joi.string()).required(),
    Assets: Joi.array().items(Joi_AssetSchema).required(),
    Status: Joi.valid('open', 'in development', 'finished').required(),
    DoC: Joi.number().required(),
    DoF: Joi.number(),
    Contributors: Joi.array().items(Joi_ContributorSchema).required()
})

module.exports = Joi_InnovationSchema