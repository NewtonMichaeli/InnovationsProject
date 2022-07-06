const jwt = require('jsonwebtoken')
const User = require('../models/User')
const authResponseHandler = require('../utils/responses/auth')
const innovationResponseHandler = require('../utils/responses/innovations')
const { AUTH_TOKEN } = require('../configs/_server')


// Check if innovation has the 'Privacy' setting true, authorize user accordingly
// Middleware requires the url-params: username, project_id
const authInnovationPrivacy = async (req, res, next) => {

    const { username, project_id } = req.params
    const user = await User.findOne({Username: username})
    if (!user) return authResponseHandler.userNotFound(res)
    
    // find associated innovation index
    const index = user.Innovations.findIndex(inv => inv._id.toString() === project_id)
    if (index === -1) return innovationResponseHandler.innovationNotFound(res)

    if (user.Innovations[index].Private) {
        // verification process - requested innovation is private
        // const token = req.header(AUTH_TOKEN)
        const token = req.cookies[AUTH_TOKEN]
        if (!token) return authResponseHandler.accessDenied(res)
        
        // extract token - verify user
        jwt.verify(token, process.env.TOKEN_SECRET, (err, data) => {
            // validate user
            if (err || (data.Username !== user.Username) || (data.Email !== user.Email)) 
                return authResponseHandler.accessDenied(res)
            // -- user is verified - next
            req.innovationIndex = index
            req.user = user
            return next()
        })
    }
    else {
        // no need to verify - requested innovation is not private
        req.innovationIndex = index
        req.user = user
        return next()
    }
}


// Innovation Exists
const getInnovationIndex = async (req, res, next) => {
    const { user } = req, { project_id } = req.params
    
    // find associated innovation index
    const index = user.Innovations.findIndex(inv => inv._id.toString() === project_id)
    if (index === -1) return innovationResponseHandler.innovationNotFound(res)

    // set innovation index
    req.innovationIndex = index
    next()
}


module.exports = {authInnovationPrivacy, getInnovationIndex}