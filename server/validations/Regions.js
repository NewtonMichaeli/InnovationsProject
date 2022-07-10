const Joi = require('@hapi/joi')

const AllowedRegions = ['Asia', 'Europe', 'Americas', 'Australia', 'Africa']

const Joi_RegionsSchema = Joi.array().items(
    Joi.valid(...AllowedRegions)
)

module.exports = {Joi_RegionsSchema, AllowedRegions}