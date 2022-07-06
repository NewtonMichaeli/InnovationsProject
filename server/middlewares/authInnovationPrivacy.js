const jwt = require('jsonwebtoken')
const User = require('../models/User')
const authResponseHandler = require('../utils/responses/auth')
const innovationResponseHandler = require('../utils/responses/innovations')
const { AUTH_TOKEN } = require('../configs/_server')


// Check if innovation has the 'Privacy' setting true, authorize user accordingly
// Middleware requires the url-params: username, project_id
const authInnovationPrivacy = async (req, res, next) => {

    const { username, project_id } = req.params
    const user = await User.findOne({Username: username})       // -- dest user
    if (!user) return authResponseHandler.userNotFound(res)
    
    // find associated innovation index
    const index = user.Innovations.findIndex(inv => inv._id.toString() === project_id)
    if (index === -1) return innovationResponseHandler.innovationNotFound(res)

    // check token
    const token = req.cookies[AUTH_TOKEN]
    let data
    // check if user is in contribution array
    if (token) {        
        // validate user
        try {
            data = jwt.verify(token, process.env.TOKEN_SECRET)
            // -- user is verified - next
            if (user.Innovations[index].Contributors.findIndex(({user_id}) => user_id.toString() === data._id) !== -1) {
                // you are a contributor
                req.innovationIndex = index
                req.req_privilege = "CONTRIBUTOR"
                req.user = user
                return next()
            }
        }
        catch(err) {
            // pass
            console.log('-- err --')
        }
    }

    // check dest-user private indicator
    if (user.Innovations[index].Private) {
        // verification process - requested innovation is private
        if (!token) return authResponseHandler.accessDenied(res)

        // validate user
        if (data?.Username !== user.Username || data?.Email !== user.Email)
            return authResponseHandler.accessDenied(res)

        // -- user is verified - next
        req.innovationIndex = index
        req.req_privilege = "CREATOR"
        req.user = user
        return next()
    }
    else {
        // no need to verify - requested innovation is not private
        req.innovationIndex = index
        req.req_privilege = "OBSERVER"
        req.user = user
        return next()
    }
}

module.exports = {authInnovationPrivacy}