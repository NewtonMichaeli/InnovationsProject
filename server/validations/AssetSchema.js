const Joi = require('@hapi/joi')

const Joi_AssetSchema = Joi.object().valid({
    path: Joi.string().required(),
    originalname: Joi.string().required(),
    src: Joi.string().required(),
    description: Joi.string().required()
})

const Joi_AssetSchema_Form = Joi.object({
    description: Joi.string().required()
})

module.exports = {Joi_AssetSchema, Joi_AssetSchema_Form}