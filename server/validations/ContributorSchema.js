const Joi = require('@hapi/joi')

const Joi_ContributorSchema = Joi.object({
    user_id: Joi.string().required(),
    roles: Joi.array().items(Joi.string()).required(),
})

module.exports = Joi_ContributorSchema