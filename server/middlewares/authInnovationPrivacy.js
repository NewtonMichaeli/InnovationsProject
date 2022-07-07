const jwt = require('jsonwebtoken')
const User = require('../models/User')
const authResponseHandler = require('../utils/responses/auth')
const innovationResponseHandler = require('../utils/responses/innovations')
const { AUTH_TOKEN, PRIVILEGES } = require('../configs/_server')


// Check if innovation has the 'Privacy' setting true, authorize user accordingly
// Middleware requires the following url-params: username, project_id
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
        catch(err) { /* token is not verified */ }
    }

    // user is not a creator nor a contributor - check innovation privacy
    if (user.Innovations[index].Private) 
        return authResponseHandler.accessDenied(res)
    
    // user is allowed to a non-private innovation
    req.req_privilege = PRIVILEGES.OBSERVER
    return next()
}


// Middleware for blocking specified privileges from the request chain
// this middleware requires the following request parameters: <req_privilege>
const allowPrivileges = (privileges) => (req, res, next) => {
    const {req_privilege: privilege} = req
    let clean = false
    console.log('Checking-', privilege)
    privileges.map(p => {
        if (p === privilege) {
            return clean = true
        }
    })
    if (clean) next()
    authResponseHandler.accessDenied(res)
}


module.exports = {authInnovationPrivacy, allowPrivileges}