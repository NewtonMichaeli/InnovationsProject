const jwt = require('jsonwebtoken')
const User = require('../models/User')
const responseHandler = require('../utils/responses')
const { AUTH_TOKEN, PRIVILEGES } = require('../configs/_server')


// Check if innovation has the 'Privacy' setting true, authorize user accordingly
// Middleware requires the following url-params: username, project_id
const authInnovationPrivacy = async (req, res, next) => {

    const { username, project_id } = req.params
    const user = await User.findOne({Username: username})       // -- dest user
    if (!user) return responseHandler.userNotFound(res)
    
    // find associated innovation index
    const index = user.Innovations.findIndex(inv => inv._id.toString() === project_id)
    if (index === -1) return responseHandler.innovationNotFound(res)
    
    // check token
    const token = req.cookies[AUTH_TOKEN]
    let data

    // set init request variables
    req.innovationIndex = index
    req.user = user

    // check if user is in contribution array
    if (token) {
        // validate user
        try {
            data = jwt.verify(token, process.env.TOKEN_SECRET)

            // validate creator
            if (data?.Username === user.Username && data?.Email === user.Email) {
                // -- user is the creator
                req.req_privilege = PRIVILEGES.CREATOR
                return next()
            }   
            
            // validate contributor
            if (user.Innovations[index].Contributors.findIndex(({user_id}) => user_id.toString() === data._id) !== -1) {
                // -- user is a contributor
                req.req_privilege = PRIVILEGES.CONTRIBUTOR
                return next()
            }
        }
        catch(err) { 
            /* token is not verified */ 
            console.log('err', err.message)
        }
    }

    // user is not a creator nor a contributor - check innovation privacy
    if (user.Innovations[index].Private) 
        return responseHandler.accessDenied(res)
    
    // user is allowed to a non-private innovation
    req.req_privilege = PRIVILEGES.OBSERVER
    return next()
}


// Allow only the specified privileges next
// Middleware requires the following request parameters: <req.req_privilege>
const allowPrivileges = (...privileges) => (req, res, next) => 
{
    if (privileges.includes(req.req_privilege)) next()
    else authResponseHandler.accessDenied(res)
}

module.exports = {authInnovationPrivacy, allowPrivileges}