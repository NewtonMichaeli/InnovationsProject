const Joi = require('@hapi/joi')
const { Joi_AssetSchema } = require('./AssetSchema')
const Joi_ContributorSchema = require('./ContributorSchema')

// Global invention schema
const Joi_InventionSchema = Joi.object({
    Name: Joi.string().required(),
    Description: Joi.string().required(),
    Tags: Joi.array().items(Joi.string()).required(),
    Roles: Joi.array().items(Joi.string()).required(),
    Assets: Joi.array().items(Joi_AssetSchema).required(),
    Status: Joi.valid('open', 'in development', 'finished').required(),
    Private: Joi.bool().required(),
    DoC: Joi.number().required(),
    DoF: Joi.number().optional(),
    Contributors: Joi.array().items(Joi_ContributorSchema).required(),
    Occupations: Joi.array().items(Joi.string()).required(),
    Owner_id: Joi.string().required()
})

// <Updating> invention schema (creator privilege) - all fields are optional
const Joi_InventionSchema_UpdatingData__creator = Joi.object({
    Name: Joi.string().optional(),
    Description: Joi.string().optional(),
    Tags: Joi.array().items(Joi.string()).optional(),
    Roles: Joi.array().items(Joi.string()).optional(),
    Occupations: Joi.array().items(Joi.string()).optional(),
    Status: Joi.valid('open', 'in development', 'finished').optional(),
    Private: Joi.bool().optional(),
    Contributors: Joi.array().items(Joi_ContributorSchema).optional()
})

// <Updating> invention schema (contributor privilege) - all fields are optional
const Joi_InventionSchema_UpdatingData__contributor = Joi.object({
    Description: Joi.string().optional(),
    Tags: Joi.array().items(Joi.string()).optional(),
    Roles: Joi.array().items(Joi.string()).optional(),
    Status: Joi.valid('open', 'in development', 'finished').optional()
})


module.exports = {Joi_InventionSchema, Joi_InventionSchema_UpdatingData__creator, Joi_InventionSchema_UpdatingData__contributor}