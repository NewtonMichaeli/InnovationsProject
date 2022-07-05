const jwt = require('jsonwebtoken')
const authRequests = require('../utils/requests/auth')
const responseHandler = require('../utils/responses/innovations')
const { AUTH_TOKEN } = require('../configs/_server')


// Handle admin routes - verify role by checking a given header-token
const userAndInnovationExists = async (req, res, next) => {

    const { username, project_id } = req.params
    const user = await authRequests.getUserByField({Username: username})
    if (!user) return responseHandler.incompleteFields(res)
    
    const index = user.Innovations.findIndex(inv => inv._id.toString() === project_id)
    if (index === -1) return responseHandler.incompleteFields(res)

    req.innovationIndex = index
    req.user = user
    next()
}

module.exports = {userAndInnovationExists}