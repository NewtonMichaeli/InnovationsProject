const jwt = require('jsonwebtoken')
const responseHandler = require('../utils/responses/auth')
const authRequests = require('../utils/requests/auth')
const { AUTH_TOKEN } = require('../configs/_server')


// Handle admin routes - verify role by checking a given header-token
const authUser = async (req, res, next) => {

    const token = req.header(AUTH_TOKEN)
    if (!token) return responseHandler.accessDenied(res)
    
    // extract token - verify user
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, data) =>
    {
        if (err) return responseHandler.accessDenied(res)
        // -- get user details
        authRequests.getUserByField({_id: data._id})
        .then(res => {
            req.user = res
            return next()
        })
        .catch(err => {
            return responseHandler.accessDenied(res)
        })

    })
}

module.exports = {authUser}