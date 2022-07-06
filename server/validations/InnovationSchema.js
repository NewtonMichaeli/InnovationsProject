const Joi = require('@hapi/joi')
const Joi_AssetSchema = require('./AssetSchema')
const Joi_ContributorSchema = require('./ContributorSchema')

// Global innovation schema
const Joi_InnovationSchema = Joi.object({
    Name: Joi.string().required(),
    Description: Joi.string().required(),
    Tags: Joi.array().items(Joi.string()).required(),
    Roles: Joi.array().items(Joi.string()).required(),
    Assets: Joi.array().items(Joi_AssetSchema).required(),
    Status: Joi.valid('open', 'in development', 'finished').required(),
    Private: Joi.bool().required(),
    DoC: Joi.number().required(),
    DoF: Joi.number().optional(),
    Contributors: Joi.array().items(Joi_ContributorSchema).required()
})

module.exports = {Joi_InnovationSchema}