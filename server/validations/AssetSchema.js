const Joi = require('@hapi/joi')

const Joi_AssetSchema = Joi.object().valid({
    path: Joi.string().required(),
    originalName: Joi.string().required()
})

module.exports = Joi_AssetSchema