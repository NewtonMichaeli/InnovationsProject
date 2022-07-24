const {ObjectId} = require('mongoose').Types
const responseHandler = require('../utils/responses')


// Checks if request parameters are valid object_id strings
const checkValidObjectIdParams = (req, res, next) => {

    let invalid_field_name = ''
    if (Object.entries(req.params).some(e => {
        if (e[0].endsWith('_id') && !ObjectId.isValid(e[1])) {
            invalid_field_name = e[0]
            return true
        }
        return false
    }))
        return responseHandler.incompleteFields(res, `Invalid ${invalid_field_name}`)
    next()
}

module.exports = {checkValidObjectIdParams}