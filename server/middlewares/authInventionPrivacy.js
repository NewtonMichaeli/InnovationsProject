const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Invention = require('../models/Invention')
const responseHandler = require('../utils/responses')
const { AUTH_TOKEN, PRIVILEGES } = require('../configs/_server')


// Check if invention has the 'Privacy' setting true, authorize user accordingly
// Middleware requires the following url-params: username, project_id
const authInventionPrivacy = async (req, res, next) => {

    const { project_id } = req.params

    // find associated invention
    const invention = await Invention.findById(project_id)
    if (!invention) return responseHandler.inventionNotFound(res)
    
    const user = await User.findById(invention.Owner_id)       // -- owner user
    if (!user) return responseHandler.userNotFound(res)
    
    // check token
    const token = req.cookies[AUTH_TOKEN] ?? req.header(AUTH_TOKEN)
    let data

    // set init request variables
    req.invention = invention
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
            // if (user.Inventions[index].Contributors.findIndex(({user_id}) => user_id === data._id.toString()) !== -1) {
            if (invention.Contributors.findIndex(({user_id}) => user_id === data._id.toString()) !== -1) {
                // -- user is a contributor
                req.req_privilege = PRIVILEGES.CONTRIBUTOR
                return next()
            }
        }
        catch(err) { /* token is not verified */ }
    }

    // user is not a creator nor a contributor - check invention privacy
    if (invention.Private)
        return responseHandler.accessDenied(res)
    
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