const jwt = require('jsonwebtoken')
const User = require('../models/User')
const responseHandler = require('../utils/responses')
const { AUTH_TOKEN, PRIVILEGES } = require('../configs/_server')


// Check if invention has the 'Privacy' setting true, authorize user accordingly
// Middleware requires the following url-params: username, project_id
const authInventionPrivacy = async (req, res, next) => {

    const { username, project_id } = req.params
    const user = await User.findOne({Username: username})       // -- dest user
    if (!user) return responseHandler.userNotFound(res)
    
    // find associated invention index
    const index = user.Inventions.findIndex(inv => inv._id.toString() === project_id)
    if (index === -1) return responseHandler.inventionNotFound(res)
    
    // check token
    const token = req.cookies[AUTH_TOKEN]
    let data

    // set init request variables
    req.inventionIndex = index
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
            if (user.Inventions[index].Contributors.findIndex(({user_id}) => user_id === data._id.toString()) !== -1) {
                // -- user is a contributor
                req.req_privilege = PRIVILEGES.CONTRIBUTOR
                return next()
            }
        }
        catch(err) { /* token is not verified */ }
    }

    // user is not a creator nor a contributor - check invention privacy
    if (user.Inventions[index].Private) {
        console.log("token", token)
        return responseHandler.accessDenied(res)
    }
    
    // user is allowed to a non-private invention
    req.req_privilege = PRIVILEGES.OBSERVER
    return next()
}


// Allow only the specified privileges next
// Middleware requires the following request parameters: <req.req_privilege>
const allowPrivileges = (...privileges) => (req, res, next) => 
{
    if (privileges.includes(req.req_privilege)) next()
    else responseHandler.accessDenied(res)
}

module.exports = {authInventionPrivacy, allowPrivileges}