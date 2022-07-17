// Auth controller
const { ASSETS_FOLDER_PATH } = require('../configs/_server')
const bcrypt = require('bcrypt')
const fs = require('fs')
const {Joi_SigninSchema, Joi_SignupSchema, Joi_UpdatingUserDataSchema} = require('../validations/AuthSchema')
const User = require('../models/User')
// utils
const authRequests = require('../utils/requests/auth')
const responseHandler = require('../utils/responses')
const signNewUserToken = require('../utils/signNewUserToken')
const { getDetailedUser } = require('../utils/requests/globals')


// Sign up controller
// Requires the following request parameters: <req.IsAdmin: boolean>
const signup = async (req, res) => {

    if (!req.body) return responseHandler.incompleteFields(res, 'Cannot sign up with no data') // -- check body first
    let {Email, Password, Username, Fname, Sname, Region} = req.body

    const {error} = Joi_SignupSchema.validate(req.body)
    if (error) return responseHandler.incompleteFields(res, error.message)

    const IsAdmin = req.IsAdmin                 // -- determine target administration status
    Password = await bcrypt.hash(Password, 10)  // -- hash password

    // signing up
    const result = await authRequests.signup({Email, Password, Fname, Sname, Username, IsAdmin, Region})
    if (!result.status) return responseHandler.failedCreatingUser(res, result?.data)

    // generating token
    const token = signNewUserToken(result.data)
    return responseHandler.userCreatedSuccessfully(res, token)
}


// Sign in controller
const signin = async (req, res) => {

    if (!req.body) return responseHandler.incompleteFields(res, 'Cannot sign in with empty credentials') // -- check body first
    let {Username, Password} = req.body

    // vaildate fields
    const {error} = Joi_SigninSchema.validate(req.body)
    if (error) return responseHandler.incompleteFields(res, error.message)
    
    // search db for existing account
    const result = await User.findOne({Username}).select('Username Email IsAdmin _id Password')
    if (!result) return responseHandler.incorrectCredentials(res)
    
    // compare hashed passwords
    const match = await bcrypt.compare(Password, result.Password)
    if (!match) return responseHandler.incorrectCredentials(res)

    // generate token
    const token = signNewUserToken(result)
    return responseHandler.loggedInSuccessfully(res, token)
}


// Get user data
// Requires the following request parameters: <req.user>
const getUserData = async (req, res) => {
    // req.user already holds the user
    // -- get detailed user
    const result = await getDetailedUser(req.user, false)
    return responseHandler.userSentSuccessfully(res, result)
}

// Search database
const searchWithQuery = async (req, res) => {
    
    const { query = '', limit = 2 } = req.params
    if (limit < 1) return responseHandler.failedSearchingWithQuery(res, `Invlid limit \"${limit}\". Limit can be 1 and above`)
    if (!query.length || query.length > 36)
        return responseHandler.failedSearchingWithQuery(res, `Invlid query. Queries length should range between 1-36`)
    // search by regex
    const results = await authRequests.searchWithQuery(query, limit)
    return responseHandler.successfullSearchWithQuery(res, results)
}


// Get user (public) data
const getProtectedUserData = async (req, res) => {
    
    const { username } = req.params
    let user = await User.findOne({Username: username})
    if (!user) return responseHandler.userNotFound(res)
    // -- get (secured) detailed user
    const result = await getDetailedUser(user, true)
    return responseHandler.userSentSuccessfully(res, result)
}


// Update user data
// Requires the following request parameters: <req.user>, <req.body>
const updateUserData = async (req, res) => {
    
    // update non-empty data
    if (!req.body) return responseHandler.incompleteFields(res, 'Cannot update user with no values')
    // extract data from request body
    const new_data = req.body, {user} = req

    // verify request data
    const {error} = Joi_UpdatingUserDataSchema.validate(new_data)
    if (error) return responseHandler.incompleteFields(res, error?.message)

    // update data
    const result = await authRequests.updateUserData(user.Username, new_data)
    if (result.status) {
        // -- generate new token and send it along with thenew data
        const new_token = signNewUserToken(result.data)
        return responseHandler.userUpdatedSuccessfully(res, result.data, new_token)
    }
    else responseHandler.failedUpdatingUser(res, result.data)
}


// Update user data
// Requires the following request parameters: <req.user>
const deleteUser = async (req, res) => {
    
    const { user } = req
    
    // delete all assets related to all user's inventions
    user.Inventions.map(inv => {
        // -- iterate through inventions
        inv.Assets.map(({path}) => {
            // -- iterate through assets in each invention
            try {
                fs.unlinkSync(`${ASSETS_FOLDER_PATH}/${path}`)
            }
            catch(err) {
                if (err?.code !== 'ENOENT') return
            }
        })
    })
    
    // delete user
    const result = await authRequests.deleteUser(user.Username)
    if (result) return responseHandler.userDeletedSuccessfully(res)
    else responseHandler.failedDeletingUser(res)
}


// Update user:following list
// Requires the following request parameters: <req.user>
const updateFollowingList = async (req, res) => {

    const {user} = req, {action, user_id} = req.params

    // validate action
    if (action !== 'remove' && action !== 'add')
        return responseHandler.incompleteFields(res, 'Must provide a valid action: "add" / "remove"')

    // avoid following yourself
    console.log(user._id.toString(), user_id)
    if (user._id.toString() === user_id)
        return responseHandler.incompleteFields(res, 'Cannot follow yourself')

    // update followings list
    const result = await authRequests.updateFollowingList(user.Username, action, user_id)
    if (result.status) return responseHandler.followingUserSuccessfully(res, action, result.data)
    else if (result.reason === 'ALREADY_FOLLOWING_USER') return responseHandler.alreadyFollowingUser(res)
    else if (result.reason === 'NOT_FOLLOWING_USER') return responseHandler.notFollowingUser(res)
    else return responseHandler.failedFollowingUser(res)
}


module.exports = {signin, signup, getUserData, updateUserData, deleteUser, getProtectedUserData, updateFollowingList, searchWithQuery}