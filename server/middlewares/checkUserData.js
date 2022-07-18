const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { AUTH_TOKEN } = require('../configs/_server')


// Checks user data - isAdmin, user_id, etc
// Handle admin routes - verify role by checking a given header-token
const checkUserData = async (req, res, next) => {

    const token = req.cookies[AUTH_TOKEN] ?? req.header(AUTH_TOKEN)
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
        req.user_id = result._id.toString()
        req.IsAdmin = result.IsAdmin
        return next()
    }
    catch(err) {
        req.IsAdmin = false
        return next()
    }
}

module.exports = {checkUserData}