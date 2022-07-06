const jwt = require('jsonwebtoken')
const authRequests = require('../utils/requests/auth')
const authResponseHandler = require('../utils/responses/auth')
const { AUTH_TOKEN } = require('../configs/_server')


// Check if innovation has the 'Privacy' setting true, authorize user accordingly
// Middleware requires the url-params: username, project_id
const authInnovationPrivacy = async (req, res, next) => {

    const { username, project_id } = req.params
    const user = await authRequests.getUserByField({Username: username})
    if (!user) return authResponseHandler.incompleteFields(res)
    
    // find associated innovation index
    const index = user.Innovations.findIndex(inv => inv._id.toString() === project_id)
    if (index === -1) return authResponseHandler.incompleteFields(res)

    if (user.Innovations[index].Private) {
        // verification process - requested innovation is private
        const token = req.header(AUTH_TOKEN)
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

module.exports = {authInnovationPrivacy}