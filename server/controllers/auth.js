// Auth controller
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const fs = require('fs')
const authRequests = require('../utils/requests/auth')
const responseHandler = require('../utils/responses/auth')
const {Joi_SigninSchema, Joi_SignupSchema, Joi_UpdatingUserDataSchema} = require('../validations/AuthSchema')
const { ASSETS_FOLDER_PATH } = require('../configs/_server')
const User = require('../models/User')


// Extract relevant fields and generate token
const signNewUserToken = ({Username, Email, IsAdmin, _id}) => jwt.sign(
    JSON.stringify({Email, Username, IsAdmin, _id: _id.toString()}),
    process.env.TOKEN_SECRET
)


// Sign up controller
// Requires the following request parameters: <req.IsAdmin: boolean>
const signup = async (req, res) => {

    if (!req.body) return responseHandler.incompleteFields(res, 'Cannot sign up with no data') // -- check body first
    let {Email, Password, Username, Fname, Sname} = req.body

    const {error} = Joi_SignupSchema.validate(req.body)
    if (error) return responseHandler.incompleteFields(res, error.message)

    const IsAdmin = req.IsAdmin                 // -- determine target administration status
    Password = await bcrypt.hash(Password, 10)  // -- hash password

    // signing up
    const result = await authRequests.signup({Email, Password, Fname, Sname, Username, IsAdmin})
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
    const result = await User.findOne({Username})
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
    return responseHandler.userSentSuccessfully(res, req.user)
}


// Get user (public) data
const getProtectedUserData = async (req, res) => {
    
    const { username } = req.params
    let result = await User.findOne({Username: username})
    if (!result) return responseHandler.userNotFound(res)
    // filter private fields and projects
    console.log('res: ', result)
    result.Password = undefined
    result.Innovations = result.Innovations.filter(inv => !inv.Private)
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
    
    // delete all assets related to all user's innovations
    user.Innovations.map(inv => {
        // -- iterate through innovations
        inv.Assets.map(({path}) => {
            // -- iterate through assets in each innovation
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


module.exports = {signin, signup, getUserData, updateUserData, deleteUser, getProtectedUserData}