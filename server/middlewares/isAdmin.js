const jwt = require('jsonwebtoken')
const authRequests = require('../utils/requests/auth')
const { AUTH_TOKEN } = require('../configs/_server')


// Handle admin routes - verify role by checking a given header-token
const isAdmin = async (req, res, next) => {

    // const token = req.header(AUTH_TOKEN)
    const token = req.cookies[AUTH_TOKEN]
    if (!token) {
        req.IsAdmin = false
        return next()
    }
    try {
        // extract token - verify admin
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        if (!verified) {
            req.IsAdmin = false
            return next()
        }
        
        const result = await authRequests.getUserByField({_id: verified.id})
        req.IsAdmin = result?.IsAdmin
        return next()
    }
    catch(err) {
        req.IsAdmin = false
        return next()
    }
}

module.exports = {isAdmin}