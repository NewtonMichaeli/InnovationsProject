const jwt = require('jsonwebtoken')
const User = require('../models/User')
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
        
        const result = await User.findById(verified._id)
        req.IsAdmin = result?.IsAdmin
        return next()
    }
    catch(err) {
        req.IsAdmin = false
        return next()
    }
}

module.exports = {isAdmin}